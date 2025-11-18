import { IsEnum } from "class-validator";
import { CourseStatus } from "../course.interface";

export class UpdateCourseStatusDto {
  @IsEnum(CourseStatus)
  status!: CourseStatus;
}
