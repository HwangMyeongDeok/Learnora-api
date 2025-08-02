import { IWishlistRepository } from "../../domain/wishlist/wishlist.repository.interface";

export class RemoveCourseFromWishlistUseCase {
  constructor(private repo: IWishlistRepository) {}

  async execute(userId: string, courseId: string) {
    return await this.repo.removeCourse(userId, courseId);
  }
}