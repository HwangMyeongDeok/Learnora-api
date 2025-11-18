import { Document, Types } from "mongoose";
import { IEnrollment } from "../enrollment/enrollment.interface";
import { ILesson } from "../lesson/lesson.interface"; // Đổi Lecture thành Lesson

// 1. Định nghĩa cấu trúc cho 1 bài học đã hoàn thành
export interface ICompletedLesson {
  lessonId: Types.ObjectId | ILesson; // Để có thể populate lấy tên bài học
  completedAt: Date;
}

// 2. Interface chính cho Progress
export interface IProgress extends Document {
  _id: Types.ObjectId;
  
  user: Types.ObjectId;
  course: Types.ObjectId; // Thêm reference course để query cho nhanh
  enrollment: Types.ObjectId | IEnrollment;

  // --- THAY ĐỔI QUAN TRỌNG ---
  // Thay vì lưu lẻ tẻ, ta lưu 1 mảng các bài đã học
  completedLessons: ICompletedLesson[]; 
  
  // --- TÍNH TOÁN TỔNG QUÁT ---
  percent: number;        // Tổng % hoàn thành khóa học (0-100)
  isCompleted: boolean;   // Đã xong toàn bộ khóa chưa? (Đổi tên từ completed -> isCompleted cho rõ nghĩa)
  completedAt?: Date;     // Ngày hoàn thành toàn bộ khóa
  
  // --- UX FEATURE (Học tiếp tục) ---
  // Lưu lại bài cuối cùng user đang xem dở để lần sau mở ra đúng bài đó
  lastLessonWatched?: Types.ObjectId | ILesson; 
}