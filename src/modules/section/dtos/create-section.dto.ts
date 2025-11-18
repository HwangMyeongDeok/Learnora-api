import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray } from "class-validator";

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  course!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  lectures?: string[];

  @IsNumber()
  order!: number;
}
