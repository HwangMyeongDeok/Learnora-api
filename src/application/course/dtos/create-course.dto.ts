import { IsString, IsOptional, IsEnum, IsNumber, IsArray } from "class-validator";
import { CourseLevel, CourseStatus } from "../../../domain/course/course.interface";

export class CreateCourseDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  slug!: string;

  @IsNumber()
  price!: number;

  @IsEnum(CourseLevel)
  level!: CourseLevel;

  @IsEnum(CourseStatus)
  status!: CourseStatus;

  @IsString()
  instructor!: string;

  @IsString()
  category!: string;

  @IsOptional()
  @IsArray()
  sections?: string[];
}
