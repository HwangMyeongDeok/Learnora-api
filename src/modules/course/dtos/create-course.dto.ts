import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, IsArray, IsMongoId, Min } from "class-validator";
import { CourseLevel, CourseStatus } from "../course.interface";

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsMongoId()
  category!: string;

  @IsNotEmpty()
  @IsEnum(CourseLevel)
  level!: CourseLevel;

  @IsOptional() 
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discountPrice?: number;

  @IsNotEmpty()
  @IsString() 
  thumbnail!: string;

  @IsNotEmpty()
  @IsString()
  language!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  outcomes?: string[];
}