import { ICategoryRepository } from "../../domain/category/category.repositoryinterface.";

export class UpdateCategoryUseCase {
  constructor(private repo: ICategoryRepository) {}

  async execute(id: string, data: any) {
    return await this.repo.update(id, data);
  }
}