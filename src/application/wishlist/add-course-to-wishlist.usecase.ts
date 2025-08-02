import { IWishlistRepository } from "../../domain/wishlist/wishlist.repository.interface";

export class AddCourseToWishlistUseCase {
  constructor(private repo: IWishlistRepository) {}

  async execute(userId: string, courseId: string) {
    return await this.repo.addCourse(userId, courseId);
  }
}