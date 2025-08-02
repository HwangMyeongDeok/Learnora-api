import { ICartRepository } from "../../domain/cart/cart.repositoryinterface.";

export class RemoveFromCartUseCase {
  constructor(private repo: ICartRepository) {}

  async execute(userId: string, courseId: string) {
    return await this.repo.removeFromCart(userId, courseId);
  }
}
