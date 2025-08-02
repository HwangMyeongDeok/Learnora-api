import { ICart } from "./cart.interface";

export interface ICartRepository {
  getByUser(userId: string): Promise<ICart | null>;
  addToCart(userId: string, courseId: string): Promise<ICart>;
  removeFromCart(userId: string, courseId: string): Promise<ICart | null>;
  clearCart(userId: string): Promise<void>;
}
