
import { IUserRepository } from "../../domain/user/user.repository.interface";
import { UserResponseDto } from "./dtos/user-response.dto";
import { plainToInstance } from "class-transformer";
import { hash } from "bcryptjs";
import { RegisterDto } from "../auth/dtos/register.dto";
import ErrorHandler from "../../middleware/ErrorHandler";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RegisterDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
        throw new ErrorHandler("Email already in use", 400);
    }

    const hashedPassword = await hash(dto.password, 10);

    const user = await this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
