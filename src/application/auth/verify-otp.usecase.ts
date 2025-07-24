import { IAuthRepository } from "../../domain/auth/auth.repository";

export class VerifyOtpUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(email: string, otp: string): Promise<boolean> {
    return await this.authRepo.verifyOTP(email, otp);
  }
}
