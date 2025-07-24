import { ICourseRepository } from "../../domain/course/course.repository.interface";
import { ICourse } from "../../domain/course/course.interface";

export class GetRelatedCoursesUseCase {
  constructor(private readonly courseRepo: ICourseRepository) {}

  async execute(courseId: string): Promise<ICourse[]> {
    return await this.courseRepo.findRelated(courseId);
  }
}
