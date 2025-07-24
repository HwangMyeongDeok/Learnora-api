import { IsEnum } from "class-validator";
import { CourseStatus } from "../../../domain/course/course.interface";

export class UpdateCourseStatusDto {
  @IsEnum(CourseStatus)
  status!: CourseStatus;
}
