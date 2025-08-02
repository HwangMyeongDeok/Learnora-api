import { ICategoryRepository } from "../../domain/category/category.repositoryinterface.";

export class DeleteCategoryUseCase {
  constructor(private repo: ICategoryRepository) {}

  async execute(id: string) {
    await this.repo.delete(id);
  }
}