import { ISectionRepository } from "../../domain/section/section.repository.interface";

export class GetSectionByCourseUseCase {
  constructor(private repo: ISectionRepository) {}

  async execute(courseId: string) {
    return await this.repo.findByCourse(courseId);
  }
}