import { ICartRepository } from "../../domain/cart/cart.repositoryinterface.";

export class GetCartUseCase {
  constructor(private repo: ICartRepository) {}

  async execute(userId: string) {
    return await this.repo.getByUser(userId);
  }
}
