import { IsString, IsOptional } from "class-validator";

export class CreateCommentDto {
  @IsString()
  content!: string;

  @IsString()
  lecture!: string;

  @IsOptional()
  @IsString()
  parentComment?: string;
}