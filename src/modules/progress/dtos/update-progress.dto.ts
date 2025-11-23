import { IsMongoId, IsNotEmpty } from "class-validator";

export class MarkLessonCompletedDto {
  @IsNotEmpty()
  @IsMongoId()
  lessonId!: string;

  @IsNotEmpty()
  @IsMongoId()
  courseId!: string;
}