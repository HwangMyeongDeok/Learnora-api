import { ICart } from "../../../domain/cart/cart.interface";
import { ICartRepository } from "../../../domain/cart/cart.repositoryinterface.";
import { Cart } from "../models/cart.model";

export class CartRepository implements ICartRepository {
  async getByUser(userId: string): Promise<ICart | null> {
    return await Cart.findOne({ user: userId }).populate("courses");
  }

  async addToCart(userId: string, courseId: string): Promise<ICart> {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $addToSet: { courses: courseId } },
      { new: true, upsert: true }
    ).populate("courses");
    return cart;
  }

  async removeFromCart(userId: string, courseId: string): Promise<ICart | null> {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { courses: courseId } },
      { new: true }
    ).populate("courses");
    return cart;
  }

  async clearCart(userId: string): Promise<void> {
    await Cart.findOneAndUpdate({ user: userId }, { $set: { courses: [] } });
  }
}
