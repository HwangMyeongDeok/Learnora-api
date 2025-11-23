import { IsNotEmpty, IsString, IsMongoId, IsNumber, Min, Max } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  @IsMongoId()
  courseId!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsNotEmpty()
  @IsString()
  comment!: string;
}