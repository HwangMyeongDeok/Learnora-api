import { Document, Types } from "mongoose";

export enum LessonType {
  VIDEO = "video",
  TEXT = "text",
  QUIZ = "quiz"
}

export interface ILesson extends Document {
  title: string;
  slug: string;
  description?: string;
  type: LessonType;
  
  content?: string;
  videoUrl?: string;
  duration: number;
  
  section: Types.ObjectId;
  course: Types.ObjectId;
  
  isPreview: boolean;
  order: number;
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILessonRepository {
  create(data: any): Promise<ILesson>;
  update(id: string, data: any): Promise<ILesson | null>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ILesson | null>;
  
  findBySection(sectionId: string): Promise<ILesson[]>;
  
  countByCourse(courseId: string): Promise<number>;
  deleteManyBySection(sectionId: string): Promise<void>;
}