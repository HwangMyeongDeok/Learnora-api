import { Types } from "mongoose";

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  parentCategory?: Types.ObjectId | ICategory;
  createdAt?: Date;
  updatedAt?: Date;
}