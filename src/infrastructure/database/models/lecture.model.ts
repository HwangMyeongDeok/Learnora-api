import { Schema, model } from "mongoose";
import { ILecture, LectureType } from "../../../domain/lecture/lecture.interface";

const lectureSchema = new Schema<ILecture>(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: Object.values(LectureType), required: true },
    content: { type: String, required: true },
    duration: { type: Number, required: true },
    section: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    isPreview: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Lecture = model<ILecture>("Lecture", lectureSchema);