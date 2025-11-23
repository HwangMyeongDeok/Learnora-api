import { Document, Types } from "mongoose";

export interface ICart extends Document {
  user: Types.ObjectId;
  courses: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICartRepository {
  getByUser(userId: string): Promise<ICart | null>;
  addToCart(userId: string, courseId: string): Promise<ICart>;
  removeFromCart(userId: string, courseId: string): Promise<ICart | null>;
  clearCart(userId: string): Promise<void>;
}