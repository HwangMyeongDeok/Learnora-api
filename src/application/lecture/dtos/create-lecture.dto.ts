import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, IsBoolean } from "class-validator";
import { LectureType } from "../../../domain/lecture/lecture.interface";

export class CreateLectureDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(LectureType)
  type!: LectureType;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsNumber()
  duration!: number;

  @IsString()
  section!: string;

  @IsOptional()
  @IsBoolean()
  isPreview?: boolean;
}