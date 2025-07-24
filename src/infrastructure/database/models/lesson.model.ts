import { Schema, model } from "mongoose";
import { ILesson, LessonType } from "../../../domain/lesson/lesson.interface";

const lessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: Object.values(LessonType), required: true },
    content: { type: String, required: true },
    duration: { type: Number, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  { timestamps: true }
);

export const Lesson = model<ILesson>("Lesson", lessonSchema);