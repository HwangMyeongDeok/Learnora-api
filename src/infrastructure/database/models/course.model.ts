import { Schema, model } from "mongoose";
import { ICourse, CourseLevel, CourseStatus } from "./course.interface";

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    level: { type: String, enum: Object.values(CourseLevel), required: true },
    status: { type: String, enum: Object.values(CourseStatus), default: CourseStatus.DRAFT },
    price: { type: Number, required: true, default: 0 },
    discountPrice: { type: Number },
    thumbnail: { type: String, required: true },
    sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    language: { type: String, required: true },
    duration: { type: Number, required: true },
    enrollmentCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Course = model<ICourse>("Course", courseSchema);