import { IsMongoId } from "class-validator";

export class AddCourseDto {
  @IsMongoId()
  courseId!: string;
}