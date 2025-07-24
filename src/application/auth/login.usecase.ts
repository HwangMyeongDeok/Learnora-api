import { LoginDto } from "./dtos/login.dto";
import { IUserRepository } from "../../domain/user/user.repository.interface";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { IAuthRepository } from "../../domain/auth/auth.repository";
import ErrorHandler from "../../middleware/ErrorHandler";

export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly authRepo: IAuthRepository
  ) {}

  async execute(dto: LoginDto) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new ErrorHandler("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new ErrorHandler("Invalid credentials", 401);

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    if (user._id) {
      await this.authRepo.saveRefreshToken(user._id.toString(), refreshToken);
    } else {
      throw new ErrorHandler("User ID is missing", 500);
    }
    return { accessToken, refreshToken };
  }
}
