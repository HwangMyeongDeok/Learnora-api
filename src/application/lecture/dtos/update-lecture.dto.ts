import { IsOptional, IsString, IsEnum, IsNumber, IsBoolean } from "class-validator";
import { LectureType } from "../../../domain/lecture/lecture.interface";

export class UpdateLectureDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(LectureType)
  type?: LectureType;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsBoolean()
  isPreview?: boolean;
}