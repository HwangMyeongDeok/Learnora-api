import { IUserRepository } from "../../domain/user/user.repository.interface";
import ErrorHandler from "../../middleware/ErrorHandler";
import { UserResponseDto } from "./dtos/user-response.dto";
import { plainToInstance } from "class-transformer";

export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
