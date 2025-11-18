import { IsMongoId } from "class-validator";

export class RemoveCourseDto {
  @IsMongoId()
  courseId!: string;
}