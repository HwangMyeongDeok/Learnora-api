import { IReview } from "../../domain/review/review.interface";
import { IReviewRepository } from "../../domain/review/review.repository";


export class CreateReviewUseCase {
  constructor(private repo: IReviewRepository) {}

  async execute(data: Partial<IReview>): Promise<IReview> {
    return await this.repo.create(data);
  }
}
