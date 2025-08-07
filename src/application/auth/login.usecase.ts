import { generateTokens } from "./../../infrastructure/shared/token";
import { LoginDto } from "./dtos/login.dto";
import { IUserRepository } from "../../domain/user/user.repository.interface";
import * as bcrypt from "bcrypt";
import { IAuthRepository } from "../../domain/auth/auth.repository.interface";
import ErrorHandler from "../../middleware/ErrorHandler";

export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly authRepo: IAuthRepository
  ) {}

  async execute(dto: LoginDto, ip?: string, deviceId?: string) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new ErrorHandler("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new ErrorHandler("Invalid credentials", 401);

    const { accessToken, refreshToken } = await generateTokens(
      user._id!.toString()
    );
    if (user._id) {
      await this.authRepo.saveRefreshToken(
        user._id.toString(),
        refreshToken,
        ip,
        deviceId
      );
    } else {
      throw new ErrorHandler("User ID is missing", 500);
    }
    return { accessToken, refreshToken };
  }
}
