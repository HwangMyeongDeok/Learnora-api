import { ICourseRepository } from "../../domain/course/course.repository.interface";
import { ICourse } from "../../domain/course/course.interface";

export class UpdateCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(courseId: string, data: Partial<ICourse>): Promise<ICourse | null> {
    return await this.courseRepository.update(courseId, data);
  }
}
