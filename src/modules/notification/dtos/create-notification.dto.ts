import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { NotificationType } from "../notification.interface";

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsMongoId()
  userId!: string; 

  @IsNotEmpty()
  @IsEnum(NotificationType)
  type!: NotificationType;

  @IsNotEmpty()
  @IsString()
  message!: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsMongoId()
  targetId?: string;
}