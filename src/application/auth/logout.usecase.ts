import { IAuthRepository } from "../../domain/auth/auth.repository.interface";

export class LogoutUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(userId: string): Promise<void> {
    await this.authRepo.revokeTokens(userId);
  }
}