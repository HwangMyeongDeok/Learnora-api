import { Document, Types } from "mongoose";

export interface ICompletedLesson {
  lessonId: Types.ObjectId;
  completedAt: Date;
}

export interface IProgress extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  enrollment: Types.ObjectId;
  completedLessons: ICompletedLesson[];
  percentCompleted: number;
  lastLessonWatched?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProgressRepository {
  create(data: any): Promise<IProgress>;
  findByUserAndCourse(userId: string, courseId: string): Promise<IProgress | null>;
  
  addCompletedLesson(
      userId: string, 
      courseId: string, 
      lessonId: string
  ): Promise<IProgress | null>;
  
  updatePercent(progressId: string, percent: number): Promise<void>;

  updateLastWatched(userId: string, courseId: string, lessonId: string): Promise<void>;
}