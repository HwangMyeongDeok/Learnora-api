import { IReview } from "./review.interface";
import { IReviewRepository } from "../../domain/review/review.repository.interface";
import { Review } from "./review.model";

export class ReviewRepository implements IReviewRepository {
  async create(data: Partial<IReview>): Promise<IReview> {
    return await Review.create(data);
  }

  async findByCourse(courseId: string): Promise<IReview[]> {
    return await Review.find({ course: courseId }).populate("user");
  }

  async update(id: string, data: Partial<IReview>): Promise<IReview | null> {
    return await Review.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await Review.findByIdAndDelete(id);
  }
}
