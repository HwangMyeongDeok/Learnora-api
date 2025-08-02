import { ICartRepository } from "../../domain/cart/cart.repositoryinterface.";

export class ClearCartUseCase {
  constructor(private repo: ICartRepository) {}

  async execute(userId: string) {
    await this.repo.clearCart(userId);
  }
}