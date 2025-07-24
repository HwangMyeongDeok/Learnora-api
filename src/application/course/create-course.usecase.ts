import { ICourse } from "../../domain/course/course.interface";
import { ICourseRepository } from "../../domain/course/course.repository.interface";

export class CreateCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(data: Partial<ICourse>): Promise<ICourse> {
    // TODO: thêm validation slug không trùng nếu cần
    return await this.courseRepository.create(data);
  }
}
