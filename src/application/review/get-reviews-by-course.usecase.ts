import { IReviewRepository } from "../../domain/review/review.repository";

export class GetReviewsByCourseUseCase {
  constructor(private repo: IReviewRepository) {}

  async execute(courseId: string) {
    return await this.repo.findByCourse(courseId);
  }
}