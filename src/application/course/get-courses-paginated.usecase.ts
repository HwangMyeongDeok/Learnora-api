import { ICourseRepository } from "../../domain/course/course.repository.interface";
import { ICourse } from "../../domain/course/course.interface";

interface Params {
  page: number;
  limit: number;
}

export class GetCoursesPaginatedUseCase {
  constructor(private readonly courseRepo: ICourseRepository) {}

  async execute({ page, limit }: Params): Promise<ICourse[]> {
    return await this.courseRepo.findAllPaginated(page, limit);
  }
}
