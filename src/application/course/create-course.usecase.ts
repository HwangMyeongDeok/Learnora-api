import { ICourse } from "../../domain/course/course.interface";
import { ICourseRepository } from "../../domain/course/course.repository.interface";

export class CreateCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(data: Partial<ICourse>): Promise<ICourse> {
    return await this.courseRepository.create(data);
  }
}
