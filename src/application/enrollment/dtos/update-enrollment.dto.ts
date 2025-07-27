import { IsOptional, IsEnum, IsDateString } from "class-validator";
import { EnrollmentStatus } from "../../../domain/enrollment/enrollment.interface";

export class UpdateEnrollmentDto {
  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus;

  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @IsOptional()
  @IsDateString()
  lastAccessed?: string;
}