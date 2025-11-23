import * as bcrypt from "bcrypt";
import crypto from "crypto";
import { plainToInstance } from "class-transformer";

import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";
import { UserResponseDto } from "../user/dtos/user-response.dto";
import { IUserRepository } from "../user/user.interface"; 
import { IKeyTokenRepository } from "./key-token.interface";

import { 
  BadRequestError, 
  AuthFailureError, 
  NotFoundError, 
  ForbiddenError 
} from "../../core/error.response";

import { createTokenPair } from "../../infrastructure/shared/token"; 
import { publishToQueue } from "../../infrastructure/messageBroker/rabbitmq.producer";

export interface ChangePasswordInput {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export class AuthService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly keyTokenRepo: IKeyTokenRepository 
  ) {}

  async register(dto: RegisterDto): Promise<UserResponseDto> {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) throw new BadRequestError("Email already exists");

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

    await publishToQueue("email.send", {
      to: user.email,
      subject: "Welcome to Donona!",
      html: `<h1>Hello ${user.name}, welcome to our platform!</h1>`,
    });

    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async login(dto: LoginDto, deviceId: string) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new AuthFailureError("Invalid credentials");

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new AuthFailureError("Invalid credentials");

    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: { type: "pkcs1", format: "pem" },
      privateKeyEncoding: { type: "pkcs1", format: "pem" },
    });

    const userId = user._id.toString();
    const tokens = await createTokenPair(
      { userId, email: user.email },
      privateKey 
    );

    await this.keyTokenRepo.createKeyToken({
      userId,
      refreshToken: tokens.refreshToken,
      publicKey: publicKey,   
      privateKey: privateKey, 
      deviceId,
    });

    return { 
        user: plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }),
        tokens 
    };
  }

  async refreshToken({ refreshToken }: RefreshTokenDto, deviceId: string) {
    const foundTokenUsed = await this.keyTokenRepo.findByRefreshTokenUsed(refreshToken!);
    if (foundTokenUsed) {
      const userId = foundTokenUsed.user.toString();
      await this.keyTokenRepo.removeKeyByUserId(userId);
      throw new ForbiddenError("Security alert! Pls relogin.");
    }

    const holderToken = await this.keyTokenRepo.findByRefreshToken(refreshToken!);
    if (!holderToken) throw new AuthFailureError("Token not found / Invalid");
    if(holderToken.deviceId !== deviceId) throw new AuthFailureError("Device mismatch");

    const user = await this.userRepo.findById(holderToken.user.toString());
    if (!user) throw new NotFoundError("User not found");

    const tokens = await createTokenPair(
      { userId: user._id.toString(), email: user.email },
      holderToken.privateKey 
    );

    await this.keyTokenRepo.updateTokenRotation(
      holderToken._id as any, 
      refreshToken!,       
      tokens.refreshToken 
    );

    return tokens;
  }

  async logout(userId: string, deviceId: string): Promise<void> {
    const keyStore = await this.keyTokenRepo.findByUserIdAndDeviceId(userId, deviceId);
    if(keyStore) {
        await this.keyTokenRepo.removeKeyById(keyStore._id as string);
    }
  }

  async changePassword({ userId, oldPassword, newPassword }: ChangePasswordInput): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new AuthFailureError("Old password incorrect");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await this.userRepo.update(userId, { password: hashedPassword });
    
    await this.keyTokenRepo.removeKeyByUserId(userId);
  }

  async forgotPassword(email: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new NotFoundError("Email not found");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    await this.keyTokenRepo.saveOTP(email, otp);

    await publishToQueue("email.send", {
        to: email,
        subject: "Password Reset OTP",
        html: `<p>Your OTP is <b>${otp}</b>. Expires in 60s.</p>`
    });

    return "OTP sent to email";
  }
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const isValid = await this.keyTokenRepo.verifyOTP(email, otp);
    if (!isValid) throw new BadRequestError("Invalid or expired OTP");
    return true;
  }
}