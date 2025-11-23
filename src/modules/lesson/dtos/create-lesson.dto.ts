import { IsString, IsNotEmpty, IsEnum, IsMongoId, IsBoolean, IsNumber, IsOptional, Min } from "class-validator";
import { LessonType } from "../lesson.interface";

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsMongoId()
  courseId!: string; 

  @IsNotEmpty()
  @IsMongoId()
  sectionId!: string; 

  @IsNotEmpty()
  @IsEnum(LessonType)
  type!: LessonType;

  @IsOptional()
  @IsString()
  content?: string; 

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsBoolean()
  isPreview?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;
}