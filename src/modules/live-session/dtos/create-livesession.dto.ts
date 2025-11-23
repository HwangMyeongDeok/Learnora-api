import { IsString, IsNotEmpty, IsDateString, IsMongoId, IsOptional } from "class-validator";

export class CreateLiveSessionDto {
  @IsNotEmpty()
  @IsMongoId()
  courseId!: string;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  startTime!: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsNotEmpty()
  @IsString()
  streamUrl!: string;
}