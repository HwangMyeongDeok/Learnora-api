import { Types } from "mongoose";
import { ICourse } from "./course.interface";

export enum LessonType {
  VIDEO = "video",
  DOCUMENT = "document",
  QUIZ = "quiz",
}

export interface ILesson {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  type: LessonType;
  content: string;
  duration: number;
  course: Types.ObjectId | ICourse;
  createdAt?: Date;
  updatedAt?: Date;
}