import { IReview } from "./review.interface";

export interface IReviewRepository {
  create(data: Partial<IReview>): Promise<IReview>;
  findByCourse(courseId: string): Promise<IReview[]>;
  update(id: string, data: Partial<IReview>): Promise<IReview | null>;
  delete(id: string): Promise<void>;
}
