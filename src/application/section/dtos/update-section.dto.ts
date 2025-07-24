import { IsOptional, IsString, IsNumber, IsArray } from "class-validator";

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  lectures?: string[];

  @IsOptional()
  @IsNumber()
  order?: number;
}
