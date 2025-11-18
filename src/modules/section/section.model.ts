import { Schema, model } from "mongoose";
import { ISection } from "./section.interface";

const sectionSchema = new Schema<ISection>(
  {
    title: { type: String, required: true },
    description: { type: String },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Section = model<ISection>("Section", sectionSchema);