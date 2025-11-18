import { Schema, model } from "mongoose";
import { IProgress } from "./progress.interface";

// src/modules/progress/progress.model.ts

const completedLessonSchema = new Schema({
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson" },
    completedAt: { type: Date, default: Date.now }
}, { _id: false });

const progressSchema = new Schema<IProgress>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrollment: { type: Schema.Types.ObjectId, ref: "Enrollment", required: true },
    
    // Mảng chứa các bài đã học
    completedLessons: [completedLessonSchema], 
    
    // Cache lại tính toán để đỡ phải count mỗi lần load trang
    percentCompleted: { type: Number, default: 0 }, 
    lastLessonWatched: { type: Schema.Types.ObjectId, ref: "Lesson" } // Để lần sau vào học tiếp đúng bài đó
  },
  { timestamps: true }
);

// Index user+course phải là duy nhất (1 user chỉ có 1 bảng tiến độ cho 1 khóa)
progressSchema.index({ user: 1, course: 1 }, { unique: true });

export const Progress = model<IProgress>("Progress", progressSchema);