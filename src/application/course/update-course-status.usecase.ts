import { ICourseRepository } from "../../domain/course/course.repository.interface";
import { ICourse, CourseStatus } from "../../domain/course/course.interface";

export class UpdateCourseStatusUseCase {
  constructor(private readonly courseRepo: ICourseRepository) {}

  async execute(id: string, status: CourseStatus): Promise<ICourse | null> {
    return await this.courseRepo.updateStatus(id, status);
  }
}
