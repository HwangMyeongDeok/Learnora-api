import { IsString, IsNumber } from "class-validator";

export class CreatePaymentDto {
  @IsString()
  course!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  transactionId!: string;
}
