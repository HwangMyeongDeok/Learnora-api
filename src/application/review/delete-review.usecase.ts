import { IReviewRepository } from "../../domain/review/review.repository";

export class DeleteReviewUseCase {
  constructor(private repo: IReviewRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}