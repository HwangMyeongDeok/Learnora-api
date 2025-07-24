import { IUserRepository } from "../../domain/user/user.repository.interface";
import ErrorHandler from "../../middleware/ErrorHandler";
import { UserResponseDto } from "./dtos/user-response.dto";
import { plainToInstance } from "class-transformer";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, data: Partial<any>): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.update(id, data);
    if (!updatedUser) {
      throw new ErrorHandler("User not found", 404);
    }

    return plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }
}
