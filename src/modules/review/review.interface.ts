import { Document, Types } from "mongoose";

export interface IReview extends Document {
  course: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReviewRepository {
  create(data: any): Promise<IReview>;
  
  findByCourse(courseId: string, page: number, limit: number): Promise<IReview[]>;
  
  checkExist(userId: string, courseId: string): Promise<IReview | null>;
  
  calculateAverageRating(courseId: string): Promise<{ avgRating: number; totalReviews: number }>;
}