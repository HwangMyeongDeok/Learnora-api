import { Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string; 
  description?: string;
  parentCategory?: Types.ObjectId | ICategory;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryRepository {
  create(data: any): Promise<ICategory>;
  findAll(): Promise<ICategory[]>;
  findById(id: string): Promise<ICategory | null>;
  update(id: string, data: any): Promise<ICategory | null>;
  delete(id: string): Promise<void>;
  findBySlug(slug: string): Promise<ICategory | null>;
}