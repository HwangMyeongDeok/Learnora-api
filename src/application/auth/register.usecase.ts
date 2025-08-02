import { RegisterDto } from "./dtos/register.dto";
import { IUserRepository } from "../../domain/user/user.repository.interface";
import { hash } from "bcryptjs";
import { UserResponseDto } from "../user/dtos/user-response.dto";
import { plainToInstance } from "class-transformer";
import { publishToQueue } from "../../infrastructure/messageBroker/rabbitmq.producer";

export class RegisterUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(dto: RegisterDto): Promise<UserResponseDto> {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await hash(dto.password, 10);

    const user = await this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

        await publishToQueue("email.send", {
      to: user.email,
      subject: "Welcome to Donona!",
      html: `<h1>Hello ${user.name}, welcome!</h1>`,
    });

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
