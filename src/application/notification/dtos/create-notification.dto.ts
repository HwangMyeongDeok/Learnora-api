import { IsString, IsEnum, IsOptional } from "class-validator";
import { NotificationChannel, NotificationType } from "../../../domain/notification/notification.interface";

export class CreateNotificationDto {
  @IsString()
  user!: string;

  @IsEnum(NotificationType)
  type!: NotificationType;

  @IsString()
  message!: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  targetId?: string;

  @IsOptional()
  @IsEnum(NotificationChannel)
  deliveredVia?: NotificationChannel;
}