import { IWishlistRepository } from "./wishlist.interface"; // Gộp interface

export class WishlistService {
  constructor(private readonly wishlistRepo: IWishlistRepository) {}

  // =================================================================
  // 1. GET WISHLIST (Xem danh sách yêu thích)
  // =================================================================
  async getWishlist(userId: string) {
    return await this.wishlistRepo.findByUser(userId);
  }

  // =================================================================
  // 2. ADD TO WISHLIST (Thêm khóa học vào danh sách)
  // =================================================================
  async addToWishlist(userId: string, courseId: string) {
    // Tech Lead Note: Logic check trùng
    // Thường thì Repository dùng toán tử $addToSet của MongoDB sẽ tự chặn trùng.
    // Nhưng nếu dùng SQL, bạn phải check if exist trước.
    
    return await this.wishlistRepo.addCourse(userId, courseId);
  }

  // =================================================================
  // 3. REMOVE FROM WISHLIST (Bỏ yêu thích)
  // =================================================================
  async removeFromWishlist(userId: string, courseId: string) {
    return await this.wishlistRepo.removeCourse(userId, courseId);
  }
}