import { Schema, model } from "mongoose";
import { ICategory } from "../../../domain/interfaces/category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    parentCategory: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);