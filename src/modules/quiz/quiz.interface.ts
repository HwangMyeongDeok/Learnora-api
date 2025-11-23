import { Document, Types } from "mongoose";

export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: number[];
  explanation?: string;
  _id?: Types.ObjectId;
}

export interface IQuiz extends Document {
  title: string;
  questions: IQuestion[];
  lesson: Types.ObjectId; 
  timeLimit?: number;
  passingScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuizRepository {
  create(data: any): Promise<IQuiz>;
  findById(id: string): Promise<IQuiz | null>;
  findByLesson(lessonId: string): Promise<IQuiz | null>;
  update(id: string, data: any): Promise<IQuiz | null>;
  delete(id: string): Promise<void>;
}