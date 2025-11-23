import { CartModel } from "./cart.model";
import { ICart, ICartRepository } from "./cart.interface";

export class CartRepository implements ICartRepository {
  
  async getByUser(userId: string): Promise<ICart | null> {
    return await CartModel.findOne({ user: userId })
        .populate("courses", "title thumbnail price slug instructor")
        .lean<ICart>();
  }

  async addToCart(userId: string, courseId: string): Promise<ICart> {
    return await CartModel.findOneAndUpdate(
      { user: userId },
      { $addToSet: { courses: courseId } },
      { new: true, upsert: true }
    )
    .populate("courses", "title price")
    .lean<ICart>();
  }

  async removeFromCart(userId: string, courseId: string): Promise<ICart | null> {
    return await CartModel.findOneAndUpdate(
      { user: userId },
      { $pull: { courses: courseId } },
      { new: true }
    )
    .populate("courses", "title price")
    .lean<ICart>();
  }

  async clearCart(userId: string): Promise<void> {
    await CartModel.findOneAndUpdate(
        { user: userId }, 
        { $set: { courses: [] } }
    );
  }
}