import { IsNotEmpty, IsNumber, IsString, IsMongoId } from "class-validator";

export class UpdatePointsDto {
  @IsNotEmpty()
  @IsNumber()
  points!: number; 
}

export class EarnBadgeDto {
  @IsNotEmpty()
  @IsString()
  badgeName!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  icon!: string;
}