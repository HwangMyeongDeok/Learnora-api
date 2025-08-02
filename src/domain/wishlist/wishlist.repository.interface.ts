import { IWishlist } from "./wishlist.interface";

export interface IWishlistRepository {
  create(data: Partial<IWishlist>): Promise<IWishlist>;
  findByUser(userId: string): Promise<IWishlist | null>;
  addCourse(userId: string, courseId: string): Promise<IWishlist | null>;
  removeCourse(userId: string, courseId: string): Promise<IWishlist | null>;
  delete(id: string): Promise<void>;
}