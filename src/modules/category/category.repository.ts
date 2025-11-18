import { ICategory } from "./category.interface";
import { ICategoryRepository } from "../../domain/category/category.repositoryinterface.";
import { Category } from "./category.model";

export class CategoryRepository implements ICategoryRepository {
  async create(data: Partial<ICategory>): Promise<ICategory> {
    return await Category.create(data);
  }

  async findAll(): Promise<ICategory[]> {
    return await Category.find().populate("parentCategory");
  }

  async findById(id: string): Promise<ICategory | null> {
    return await Category.findById(id).populate("parentCategory");
  }

  async update(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await Category.findByIdAndDelete(id);
  }
}
