import { Types } from "mongoose";
import { ISection } from "../section/section.interface";

export enum LectureType {
  VIDEO = "video",
  DOCUMENT = "document",
  QUIZ = "quiz",
  ASSIGNMENT = "assignment",
}

export interface ILecture {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  type: LectureType;
  content: string; 
  duration: number; 
  section: Types.ObjectId | ISection;
  isPreview: boolean; 
  createdAt?: Date;
  updatedAt?: Date;
}