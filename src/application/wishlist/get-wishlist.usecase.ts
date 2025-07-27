import { IWishlistRepository } from "../../domain/wishlist/wishlist.repository";

export class GetWishlistUseCase {
  constructor(private repo: IWishlistRepository) {}

  async execute(userId: string) {
    return await this.repo.findByUser(userId);
  }
}