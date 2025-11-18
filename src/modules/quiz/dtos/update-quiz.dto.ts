import { IsOptional } from "class-validator";
import { CreateQuizDto } from "./create-quiz.dto";
export class UpdateQuizDto extends CreateQuizDto {
  @IsOptional()
  title!: string;

  @IsOptional()
  questions!: any;

  @IsOptional()
  timeLimit?: number;

  @IsOptional()
  passingScore!: number;
}