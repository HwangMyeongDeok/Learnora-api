import { CategoryModel } from "./category.model";
import { ICategory, ICategoryRepository } from "./category.interface";

export class CategoryRepository implements ICategoryRepository {
  
  async create(data: any): Promise<ICategory> {
    return await CategoryModel.create(data);
  }

  async findAll(): Promise<ICategory[]> {
    return await CategoryModel.find()
      .populate("parentCategory", "name slug")
      .lean<ICategory[]>();
  }

  async findById(id: string): Promise<ICategory | null> {
    return await CategoryModel.findById(id).lean<ICategory>();
  }

  async findBySlug(slug: string): Promise<ICategory | null> {
    return await CategoryModel.findOne({ slug }).lean<ICategory>();
  }

  async update(id: string, data: any): Promise<ICategory | null> {
    return await CategoryModel.findByIdAndUpdate(id, data, { new: true }).lean<ICategory>();
  }

  async delete(id: string): Promise<void> {
    await CategoryModel.findByIdAndDelete(id);
  }
}