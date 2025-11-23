import { Schema, model } from "mongoose";
import { IProgress } from "./progress.interface";

const DOCUMENT_NAME = "Progress";
const COLLECTION_NAME = "Progresses"; 

const completedLessonSchema = new Schema({
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson" },
    completedAt: { type: Date, default: Date.now }
}, { _id: false });

const progressSchema = new Schema<IProgress>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrollment: { type: Schema.Types.ObjectId, ref: "Enrollment", required: true },
    
    completedLessons: [completedLessonSchema], 
    
    percentCompleted: { type: Number, default: 0, min: 0, max: 100 }, 
    lastLessonWatched: { type: Schema.Types.ObjectId, ref: "Lesson" }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

progressSchema.index({ user: 1, course: 1 }, { unique: true });

export const ProgressModel = model<IProgress>(DOCUMENT_NAME, progressSchema);