import { IsMongoId, IsNotEmpty, IsString, IsEnum, IsNumber, Min, IsOptional } from "class-validator";
import { PaymentGateway } from "../payment.interface";

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsMongoId()
  courseId!: string;

  @IsNotEmpty()
  @IsEnum(PaymentGateway)
  gateway!: PaymentGateway; 

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number; 
}