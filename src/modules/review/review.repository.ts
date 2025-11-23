import { ReviewModel } from "./review.model";
import { IReview, IReviewRepository } from "./review.interface";
import { Types } from "mongoose";

export class ReviewRepository implements IReviewRepository {
  
  async create(data: any): Promise<IReview> {
    return await ReviewModel.create(data);
  }

  async findByCourse(courseId: string, page: number, limit: number): Promise<IReview[]> {
    const skip = (page - 1) * limit;
    return await ReviewModel.find({ course: courseId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name avatar") 
        .lean<IReview[]>();
  }

  async checkExist(userId: string, courseId: string): Promise<IReview | null> {
    return await ReviewModel.findOne({ user: userId, course: courseId }).lean<IReview>();
  }

  async calculateAverageRating(courseId: string): Promise<{ avgRating: number; totalReviews: number }> {
    const stats = await ReviewModel.aggregate([
      { $match: { course: new Types.ObjectId(courseId) } },
      {
        $group: {
          _id: "$course",
          totalReviews: { $sum: 1 },
          avgRating: { $avg: "$rating" }
        }
      }
    ]);

    if (stats.length > 0) {
      return { 
        avgRating: Math.round(stats[0].avgRating * 10) / 10, 
        totalReviews: stats[0].totalReviews 
      };
    }
    
    return { avgRating: 0, totalReviews: 0 };
  }
}