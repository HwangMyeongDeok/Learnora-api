import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsMongoId()
  courseId!: string;

  @IsOptional()
  @IsNumber()
  pricePaid?: number;

  @IsOptional()
  @IsString()
  couponCode?: string;
}