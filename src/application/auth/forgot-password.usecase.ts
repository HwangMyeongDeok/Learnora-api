import { IAuthRepository } from "../../domain/auth/auth.repository.interface";
import { IUserRepository } from "../../domain/user/user.repository.interface";
import ErrorHandler from "../../middleware/ErrorHandler";

export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly authRepo: IAuthRepository
  ) {}

  async execute(email: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new ErrorHandler("Email not found", 404);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.authRepo.saveOTP(email, otp);

    return otp;
  }
}
