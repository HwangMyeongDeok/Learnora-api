import { IUserRepository } from "../../domain/user/user.repository.interface";
import { ErrorHandler } from "../../shared/ErrorHandler";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new ErrorHandler("User not found", 404);
    }

    await this.userRepository.delete(id);
  }
}
