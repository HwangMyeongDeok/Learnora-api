import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsMongoId, IsNumber, IsArray, ValidateNested, Min, IsOptional } from "class-validator";

class QuestionDto {
  @IsNotEmpty()
  @IsString()
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
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsMongoId()
  lessonId!: string; 

  @IsOptional()
  @IsNumber()
  timeLimit?: number; 

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  passingScore!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions!: QuestionDto[];
}