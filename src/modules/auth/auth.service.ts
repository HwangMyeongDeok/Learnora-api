import * as bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";

// DTOs
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";

// Interfaces
import { IUserRepository } from "../../domain/user/user.repository.interface"; // Hoặc path mới trong modules/user

// Helpers & Middleware
import ErrorHandler from "../../middleware/ErrorHandler";
import { generateTokens } from "../../infrastructure/shared/token"; // Hoặc path tới utils shared
import { publishToQueue } from "../../infrastructure/messageBroker/rabbitmq.producer";
import { IAuthRepository } from "../../domain/auth/auth.repository.interface";
import { UserResponseDto } from "../user/dtos/user-response.dto";

// Interface nội bộ cho hàm changePassword
export interface ChangePasswordInput {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export class AuthService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly authRepo: IAuthRepository
  ) {}

  // =================================================================
  // 1. REGISTER
  // =================================================================
  async register(dto: RegisterDto): Promise<UserResponseDto> {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new ErrorHandler("Email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

    // Gửi email welcome qua RabbitMQ
    await publishToQueue("email.send", {
      to: user.email,
      subject: "Welcome to Donona!",
      html: `<h1>Hello ${user.name}, welcome!</h1>`,
    });

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  // =================================================================
  // 2. LOGIN
  // =================================================================
  async login(dto: LoginDto, deviceId?: string) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new ErrorHandler("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new ErrorHandler("Invalid credentials", 401);

    if (!user._id) throw new ErrorHandler("User ID is missing", 500);

    const userId = user._id.toString();
    const { accessToken, refreshToken } = await generateTokens(userId, deviceId);

    await this.authRepo.saveRefreshToken(userId, refreshToken, deviceId);

    return { accessToken, refreshToken };
  }

  // =================================================================
  // 3. LOGOUT
  // =================================================================
  async logout(userId: string, deviceId: string): Promise<void> {
    await this.authRepo.revokeTokens(userId, deviceId);
  }

  // =================================================================
  // 4. REFRESH TOKEN (Logic phức tạp nhất)
  // =================================================================
  async refreshToken({ refreshToken }: RefreshTokenDto, deviceId: string = "unknown") {
    if (!refreshToken) {
      throw new ErrorHandler("Refresh token is required", 400);
    }

    // --- Check 1: Check tokenInfo in Redis (Fast check) ---
    const tokenInfo = await this.authRepo.getRefreshTokenInfo(refreshToken);

    if (tokenInfo) {
      const { userId, deviceId: storedDeviceId } = tokenInfo;

      if (storedDeviceId !== deviceId) {
        throw new ErrorHandler("Device mismatch.", 401);
      }

      // Revoke token cũ
      await this.authRepo.revokeTokens(userId, deviceId, refreshToken);

      const user = await this.userRepo.findById(userId);
      if (!user || !user._id) {
        throw new ErrorHandler("User not found", 404);
      }

      // Cấp cặp token mới
      const tokens = await generateTokens(user._id.toString(), deviceId);
      return tokens;
    }

    // --- Check 2: Check for reused token (Security check) ---
    const isReused = await this.authRepo.isTokenReusedAndRevoked(refreshToken);
    if (isReused) {
      // Tìm xem ai là chủ nhân của token bị dùng lại này
      const reusedSession = await this.authRepo.findRefreshTokenInDB(refreshToken);
      
      if (reusedSession) {
        const userId = reusedSession.user.toString();
        // Nguy hiểm! Xóa sạch mọi token của user này bắt đăng nhập lại
        await this.authRepo.revokeAllTokens(userId);
      }

      throw new ErrorHandler("Refresh token reuse detected. All sessions revoked.", 403);
    }

    // --- Check 3: Fallback DB check (Slow check) ---
    const fallbackSession = await this.authRepo.findRefreshTokenInDB(refreshToken);
    if (!fallbackSession) {
      throw new ErrorHandler("Refresh token not found", 401);
    }

    const userId = fallbackSession.user.toString();
    
    // Revoke token cũ
    await this.authRepo.revokeTokens(userId, deviceId);

    const user = await this.userRepo.findById(userId);
    if (!user || !user._id) {
      throw new ErrorHandler("User not found", 404);
    }

    // Cấp token mới
    const tokens = await generateTokens(user._id.toString(), deviceId);
    return tokens;
  }

  // =================================================================
  // 5. CHANGE PASSWORD
  // =================================================================
  async changePassword(input: ChangePasswordInput): Promise<void> {
    const user = await this.userRepo.findById(input.userId);
    if (!user) throw new ErrorHandler("User not found", 404);

    const isMatch = await bcrypt.compare(input.oldPassword, user.password);
    if (!isMatch) throw new ErrorHandler("Old password is incorrect", 400);

    const hashedNewPassword = await bcrypt.hash(input.newPassword, 10);

    await this.userRepo.update(input.userId, { password: hashedNewPassword });
  }

  // =================================================================
  // 6. FORGOT PASSWORD
  // =================================================================
  async forgotPassword(email: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new ErrorHandler("Email not found", 404);

    // Generate OTP 6 số
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    await this.authRepo.saveOTP(email, otp);

    // TODO: Có thể publish event gửi email OTP ở đây thay vì chỉ return OTP
    return otp;
  }

  // =================================================================
  // 7. VERIFY OTP
  // =================================================================
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    return await this.authRepo.verifyOTP(email, otp);
  }
}