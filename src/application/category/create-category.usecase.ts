import { ICategoryRepository } from "../../domain/category/category.repositoryinterface.";

export class CreateCategoryUseCase {
  constructor(private repo: ICategoryRepository) {}

  async execute(data: any) {
    return await this.repo.create(data);
  }
}
