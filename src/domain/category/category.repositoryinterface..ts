import { ICategory } from "./category.interface";

export interface ICategoryRepository {
  create(data: Partial<ICategory>): Promise<ICategory>;
  findAll(): Promise<ICategory[]>;
  findById(id: string): Promise<ICategory | null>;
  update(id: string, data: Partial<ICategory>): Promise<ICategory | null>;
  delete(id: string): Promise<void>;
}
