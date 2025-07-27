import { IsOptional, IsBoolean, IsNumber } from "class-validator";

export class UpdateProgressDto {
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsNumber()
  durationWatched?: number;

  @IsOptional()
  @IsNumber()
  percent?: number;
}