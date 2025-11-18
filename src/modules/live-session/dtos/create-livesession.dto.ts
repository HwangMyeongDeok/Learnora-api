import { IsDateString, IsEnum, IsString } from "class-validator";
import { LiveSessionStatus } from "../live-session..interface";

export class CreateLiveSessionDto {
  @IsString()
  course!: string;

  @IsString()
  instructor!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsDateString()
  startTime!: string;

  @IsDateString()
  endTime!: string;

  @IsEnum(LiveSessionStatus)
  status!: LiveSessionStatus;

  @IsString()
  streamUrl!: string;
}
