import { IWishlist } from "./wishlist.interface";
import { IWishlistRepository } from "../../domain/wishlist/wishlist.repository.interface";
import { Wishlist } from "./wishlist.model";

export class WishlistRepository implements IWishlistRepository {
  async create(data: Partial<IWishlist>): Promise<IWishlist> {
    return await Wishlist.create(data);
  }

  async findByUser(userId: string): Promise<IWishlist | null> {
    return await Wishlist.findOne({ user: userId }).populate("courses");
  }

  async addCourse(userId: string, courseId: string): Promise<IWishlist | null> {
    return await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { courses: courseId } },
      { new: true, upsert: true }
    ).populate("courses");
  }

  async removeCourse(userId: string, courseId: string): Promise<IWishlist | null> {
    return await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { courses: courseId } },
      { new: true }
    ).populate("courses");
  }

  async delete(id: string): Promise<void> {
    await Wishlist.findByIdAndDelete(id);
  }
}