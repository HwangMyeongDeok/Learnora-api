import { IUserRepository } from "../../domain/user/user.repository.interface";
import * as bcrypt from "bcrypt";
import ErrorHandler from "../../middleware/ErrorHandler";

interface ChangePasswordInput {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export class ChangePasswordUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: ChangePasswordInput): Promise<void> {
    const user = await this.userRepo.findById(input.userId);
    if (!user) throw new ErrorHandler("User not found", 404);

    const isMatch = await bcrypt.compare(input.oldPassword, user.password);
    if (!isMatch) throw new ErrorHandler("Old password is incorrect", 400);

    const hashedNewPassword = await bcrypt.hash(input.newPassword, 10);

    await this.userRepo.update(input.userId, { password: hashedNewPassword });
  }
}
