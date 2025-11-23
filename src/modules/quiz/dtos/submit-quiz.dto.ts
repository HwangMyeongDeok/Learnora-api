import { IsArray, IsMongoId, IsNotEmpty, IsNumber } from "class-validator";

export class SubmitQuizDto {
  @IsNotEmpty()
  @IsMongoId()
  quizId!: string;

  @IsArray()
  userAnswers!: number[][]; 
}