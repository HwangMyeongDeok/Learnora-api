import { IsBoolean, IsOptional, IsString, IsNumber } from "class-validator";

export class CreateProgressDto {
  @IsString()
  enrollment!: string;

  @IsString()
  lecture!: string;

  @IsBoolean()
  completed!: boolean;

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