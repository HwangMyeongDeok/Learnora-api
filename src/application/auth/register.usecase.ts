import { RegisterDto } from "./dtos/register.dto";
import { IUserRepository } from "../../domain/user/user.repository.interface";
import { hash } from "bcryptjs";
import { UserResponseDto } from "../user/dtos/user-response.dto";
import { plainToInstance } from "class-transformer";

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RegisterDto): Promise<UserResponseDto> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await hash(dto.password, 10);

    const user = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
