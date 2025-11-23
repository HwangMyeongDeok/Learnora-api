import { IWishlistRepository } from "./wishlist.interface";
import { NotFoundError } from "../../core/error.response";

export class WishlistService {
  constructor(private readonly wishlistRepo: IWishlistRepository) {}

  async getMyWishlist(userId: string) {
    const wishlist = await this.wishlistRepo.getByUser(userId);
    if (!wishlist) return { courses: [] };
    return wishlist;
  }

  async addToWishlist(userId: string, courseId: string) {
    return await this.wishlistRepo.addCourse(userId, courseId);
  }

  async removeFromWishlist(userId: string, courseId: string) {
    const result = await this.wishlistRepo.removeCourse(userId, courseId);
    if (!result) throw new NotFoundError("Wishlist not found");
    return result;
  }
}