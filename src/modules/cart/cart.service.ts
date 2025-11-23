import { ICartRepository } from "./cart.interface";
import { NotFoundError } from "../../core/error.response";

export class CartService {
  constructor(private readonly cartRepo: ICartRepository) {}

  async getCart(userId: string) {
    const cart = await this.cartRepo.getByUser(userId);
    if (!cart) return { courses: [] };
    return cart;
  }

  async addToCart(userId: string, courseId: string) {
    return await this.cartRepo.addToCart(userId, courseId);
  }

  async removeFromCart(userId: string, courseId: string) {
    const cart = await this.cartRepo.removeFromCart(userId, courseId);
    if (!cart) throw new NotFoundError("Cart not found");
    return cart;
  }

  async clearCart(userId: string) {
    await this.cartRepo.clearCart(userId);
  }
}