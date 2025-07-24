import { ICourseRepository } from "../../domain/course/course.repository.interface";
import { ICourse } from "../../domain/course/course.interface";

export class GetCourseByIdUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(courseId: string): Promise<ICourse | null> {
    return await this.courseRepository.findById(courseId);
  }
}
