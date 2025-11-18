// import { AddCourseDto } from "./dtos/add-course.dto"; // Import DTO nếu cần

import { ICartRepository } from "../../domain/cart/cart.repositoryinterface.";

export class CartService {
  constructor(private readonly cartRepo: ICartRepository) {}

  // =================================================================
  // 1. GET CART
  // =================================================================
  async getCart(userId: string) {
    // Có thể thêm logic validate userId ở đây nếu cần
    return await this.cartRepo.getByUser(userId);
  }

  // =================================================================
  // 2. ADD TO CART (Mình bổ sung thêm cho đủ bộ)
  // =================================================================
  async addToCart(userId: string, courseId: string) {
    // Logic cũ của add-to-cart.usecase.ts
    return await this.cartRepo.addToCart(userId, courseId);
  }

  // =================================================================
  // 3. REMOVE FROM CART
  // =================================================================
  async removeFromCart(userId: string, courseId: string) {
    return await this.cartRepo.removeFromCart(userId, courseId);
  }

  // =================================================================
  // 4. CLEAR CART
  // =================================================================
  async clearCart(userId: string) {
    await this.cartRepo.clearCart(userId);
    // Có thể return message success nếu muốn
    return { message: "Cart cleared successfully" };
  }
}