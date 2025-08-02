import { IReview } from "../../domain/review/review.interface";
import { IReviewRepository } from "../../domain/review/review.repository.interface";

export class UpdateReviewUseCase {
  constructor(private repo: IReviewRepository) {}

  async execute(id: string, data: Partial<IReview>) {
    return await this.repo.update(id, data);
  }
}