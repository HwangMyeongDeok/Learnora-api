import { ICategoryRepository } from "./category.interface";
import { NotFoundError, BadRequestError } from "../../core/error.response";
import slugify from "slugify";

export class CategoryService {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async createCategory(data: any) {
    return await this.categoryRepo.create(data);
  }

  async getAllCategories() {
    return await this.categoryRepo.findAll();
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new NotFoundError("Category not found");
    return category;
  }

  async updateCategory(id: string, data: any) {
    if (data.name) {
        data.slug = slugify(data.name, { lower: true, strict: true });
    }
    
    const updated = await this.categoryRepo.update(id, data);
    if (!updated) throw new NotFoundError("Category not found to update");
    return updated;
  }

  async deleteCategory(id: string) {
    await this.categoryRepo.delete(id);
  }
}