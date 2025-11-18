import { IUserRepository } from "./user.interface"; // Gộp interface
import { UserResponseDto } from "./dtos/user-response.dto";
import { RegisterDto } from "../auth/dtos/register.dto"; // Hoặc DTO create user riêng
import { plainToInstance } from "class-transformer";
import * as bcrypt from "bcrypt"; // Dùng thống nhất bcrypt
import ErrorHandler from "../../middleware/ErrorHandler";

export class UserService {
  constructor(private readonly userRepo: IUserRepository) {}

  // =================================================================
  // 1. CREATE USER (Admin tạo user hoặc Register)
  // =================================================================
  async createUser(dto: RegisterDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepo.findByEmail(dto.email);
    if (existingUser) {
        throw new ErrorHandler("Email already in use", 400);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepo.create({
      ...dto, // name, email
      password: hashedPassword,
      // role: dto.role || 'student' // Nếu muốn cho phép set role ngay lúc tạo
    });

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  // =================================================================
  // 2. GET ALL USERS (Thường cho Admin)
  // =================================================================
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepo.findAll();
    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  // =================================================================
  // 3. GET USER BY ID (Xem profile)
  // =================================================================
  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  // =================================================================
  // 4. UPDATE USER (Sửa profile)
  // =================================================================
  async updateUser(id: string, data: Partial<any>): Promise<UserResponseDto> {
    // Tech Lead Note: Bảo mật - User thường không được tự sửa 'role' hoặc 'password' qua API này
    // if (data.role && currentUser.role !== 'admin') {
    //    throw new ErrorHandler("You cannot change your role", 403);
    // }
    // if (data.password) {
    //    throw new ErrorHandler("Please use Change Password API", 400);
    // }

    const updatedUser = await this.userRepo.update(id, data);
    if (!updatedUser) {
      throw new ErrorHandler("User not found", 404);
    }

    return plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  // =================================================================
  // 5. DELETE USER (Admin xóa hoặc User tự xóa tài khoản)
  // =================================================================
  async deleteUser(id: string): Promise<void> {
    const existingUser = await this.userRepo.findById(id);
    if (!existingUser) {
      throw new ErrorHandler("User not found", 404);
    }

    await this.userRepo.delete(id);
    // Tech Lead Note: Logic cleanup dữ liệu liên quan
    // Xóa Enrollment? Xóa Progress? Hay giữ lại để làm báo cáo?
    // Thường sẽ Soft Delete (isDeleted: true) thay vì xóa vĩnh viễn.
  }
}