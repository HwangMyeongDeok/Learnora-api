import { ICourseRepository } from "../../domain/course/course.repository.interface";

export class DeleteCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(courseId: string): Promise<void> {
    await this.courseRepository.delete(courseId);
  }
}
