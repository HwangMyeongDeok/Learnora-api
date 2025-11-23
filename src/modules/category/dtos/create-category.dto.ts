import { IsString, IsNotEmpty, IsOptional, IsMongoId } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsMongoId()
  parentCategory?: string;
}