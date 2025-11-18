// src/modules/lesson/lesson.model.ts
import { Schema, model } from "mongoose";
import { ILesson, LessonType } from "./lesson.interface";

const lessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true }, // Nên có slug để SEO bài học
    description: { type: String },
    type: { type: String, enum: Object.values(LessonType), required: true }, // video, text, quiz
    
    content: { type: String }, // Nếu là Text thì lưu HTML, nếu Video thì lưu URL
    videoUrl: { type: String }, // Tách riêng URL video ra cho rõ ràng
    duration: { type: Number, default: 0 }, // Tính bằng giây
    
    section: { type: Schema.Types.ObjectId, ref: "Section", required: true }, // Link tới Section
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true }, // Link tới Course (để query nhanh)
    
    isPreview: { type: Boolean, default: false }, // Cho phép học thử
    order: { type: Number, default: 0 } // Sắp xếp thứ tự bài học
  },
  { timestamps: true }
);

// Tạo index để query nhanh bài học trong 1 chương
lessonSchema.index({ section: 1, order: 1 }); 

export const Lesson = model<ILesson>("Lesson", lessonSchema);