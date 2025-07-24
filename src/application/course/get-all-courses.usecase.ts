import { ICourseRepository } from "../../domain/course/course.repository.interface";
import { ICourse } from "../../domain/course/course.interface";

export class GetAllCoursesUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(): Promise<ICourse[]> {
    return await this.courseRepository.findAll();
  }
}
