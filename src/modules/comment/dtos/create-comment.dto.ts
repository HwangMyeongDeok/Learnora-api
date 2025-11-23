import { IsMongoId, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsMongoId()
  lessonId!: string;

  @IsOptional()
  @IsMongoId()
  parentComment?: string;
}