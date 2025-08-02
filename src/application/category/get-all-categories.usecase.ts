import { ICategoryRepository } from "../../domain/category/category.repositoryinterface.";

export class GetAllCategoriesUseCase {
  constructor(private repo: ICategoryRepository) {}

  async execute() {
    return await this.repo.findAll();
  }
}
