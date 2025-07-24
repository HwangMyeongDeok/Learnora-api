import { ICourseRepository } from "../../domain/course/course.repository.interface";
import { ICourse } from "../../domain/course/course.interface";

export class GetCourseBySlugUseCase {
  constructor(private readonly courseRepo: ICourseRepository) {}

  async execute(slug: string): Promise<ICourse | null> {
    return await this.courseRepo.findBySlug(slug);
  }
}
