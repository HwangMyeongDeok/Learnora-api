import { Schema, model } from "mongoose";
import { ISection } from "./section.interface";

const DOCUMENT_NAME = "Section";
const COLLECTION_NAME = "Sections";

const sectionSchema = new Schema<ISection>(
  {
    title: { type: String, required: true },
    description: { type: String },

    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

    order: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

sectionSchema.index({ course: 1, order: 1 });

sectionSchema.virtual("lessons", {
  ref: "Lesson",
  localField: "_id",
  foreignField: "section",
  options: { sort: { order: 1 } },
});

export const SectionModel = model<ISection>(DOCUMENT_NAME, sectionSchema);
