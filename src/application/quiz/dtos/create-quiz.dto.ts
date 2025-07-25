import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";

class QuestionDto {
  @IsString()
  @IsNotEmpty()
  question!: string;

  @IsArray()
  @IsString({ each: true })
  options!: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  correctAnswer!: number[];

  @IsOptional()
  @IsString()
  explanation?: string;
}

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions!: QuestionDto[];

  @IsString()
  lecture!: string;

  @IsOptional()
  @IsNumber()
  timeLimit?: number;

  @IsNumber()
  passingScore!: number;
}