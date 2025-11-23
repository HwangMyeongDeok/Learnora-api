import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";
import slugify from "slugify"; 

const DOCUMENT_NAME = "Category";
const COLLECTION_NAME = "Categories";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true }, 
    description: { type: String },
    parentCategory: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const CategoryModel = model<ICategory>(DOCUMENT_NAME, categorySchema);