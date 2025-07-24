import { ICourseRepository } from "../../domain/course/course.repository.interface";
import { ICourse, CourseLevel, CourseStatus } from "../../domain/course/course.interface";

interface SearchFilters {
  keyword?: string;
  category?: string;
  level?: CourseLevel;
  priceRange?: [number, number];
  status?: CourseStatus;
}

export class SearchCoursesUseCase {
  constructor(private readonly courseRepo: ICourseRepository) {}

  async execute(filters: SearchFilters): Promise<ICourse[]> {
    return await this.courseRepo.search(filters);
  }
}
