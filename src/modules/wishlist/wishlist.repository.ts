import { WishlistModel } from "./wishlist.model";
import { IWishlist, IWishlistRepository } from "./wishlist.interface";

export class WishlistRepository implements IWishlistRepository {
  
  async getByUser(userId: string): Promise<IWishlist | null> {
    return await WishlistModel.findOne({ user: userId })
        .populate("courses", "title thumbnail price slug instructor averageRating") 
        .lean<IWishlist>();
  }

  async addCourse(userId: string, courseId: string): Promise<IWishlist> {
    return await WishlistModel.findOneAndUpdate(
      { user: userId },
      { $addToSet: { courses: courseId } },
      { new: true, upsert: true } 
    )
    .populate("courses", "title thumbnail price")
    .lean<IWishlist>();
  }

  async removeCourse(userId: string, courseId: string): Promise<IWishlist | null> {
    return await WishlistModel.findOneAndUpdate(
      { user: userId },
      { $pull: { courses: courseId } },
      { new: true }
    )
    .populate("courses", "title thumbnail price")
    .lean<IWishlist>();
  }
}