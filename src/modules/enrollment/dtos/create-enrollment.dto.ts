import { IsString, IsOptional, IsEnum } from "class-validator";
import { EnrollmentStatus } from "../enrollment.interface";

export class CreateEnrollmentDto {
  @IsString()
  student!: string;

  @IsString()
  course!: string;

  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus;
}