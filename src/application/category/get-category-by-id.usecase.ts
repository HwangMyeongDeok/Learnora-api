import { ICategoryRepository } from "../../domain/category/category.repositoryinterface.";

export class GetCategoryByIdUseCase {
  constructor(private repo: ICategoryRepository) {}

  async execute(id: string) {
    return await this.repo.findById(id);
  }
}