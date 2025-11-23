import { IsNotEmpty, IsString, IsMongoId, IsNumber, IsOptional } from "class-validator";

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsMongoId()
  courseId!: string;

  @IsNotEmpty()
  @IsNumber()
  order!: number;
}