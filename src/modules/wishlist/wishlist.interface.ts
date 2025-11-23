import { Document, Types } from "mongoose";

export interface IWishlist extends Document {
  user: Types.ObjectId;
  courses: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWishlistRepository {
  getByUser(userId: string): Promise<IWishlist | null>;
  addCourse(userId: string, courseId: string): Promise<IWishlist>;
  removeCourse(userId: string, courseId: string): Promise<IWishlist | null>;
}