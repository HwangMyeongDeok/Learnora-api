import { IsOptional, IsString, IsEnum, IsDateString } from "class-validator";
import { LiveSessionStatus } from "../../../domain/liveSession/liveSession.interface";

export class UpdateLiveSessionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsEnum(LiveSessionStatus)
  status?: LiveSessionStatus;

  @IsOptional()
  @IsString()
  streamUrl?: string;
}