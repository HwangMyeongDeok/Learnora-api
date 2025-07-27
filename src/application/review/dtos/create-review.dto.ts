import { IsString, IsNotEmpty, IsNumber, Min, Max } from "class-validator";

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  course!: string;

  @IsString()
  @IsNotEmpty()
  user!: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  @IsNotEmpty()
  comment!: string;
}
