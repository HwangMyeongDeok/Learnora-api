import { Expose, Transform } from "class-transformer";
import { UserRole } from "../user.interface";

export class UserResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: UserRole;

  @Expose()
  avatar?: string;

  @Expose()
  bio?: string;

  @Expose()
  socialLinks?: { platform: string; url: string }[];

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
