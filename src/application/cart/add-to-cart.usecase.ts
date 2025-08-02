import { ICartRepository } from "../../domain/cart/cart.repositoryinterface.";

export class AddToCartUseCase {
  constructor(private repo: ICartRepository) {}

  async execute(userId: string, courseId: string) {
    return await this.repo.addToCart(userId, courseId);
  }
}
