import { Types } from "mongoose";
import { ILecture } from "../lecture/lecture.interface";

export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface IQuiz {
  _id?: Types.ObjectId;
  title: string;
  questions: IQuestion[];
  lecture: Types.ObjectId | ILecture;
  timeLimit?: number; 
  passingScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}