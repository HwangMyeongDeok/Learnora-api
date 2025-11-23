import { Schema, model } from "mongoose";
import { IQuestion, IQuiz } from "./quiz.interface";

const DOCUMENT_NAME = "Quiz";
const COLLECTION_NAME = "Quizzes";

const questionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: [{ type: Number, required: true }],
    explanation: { type: String },
  },
  { _id: false } 
);

const quizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true },
    questions: [questionSchema],
    
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    
    timeLimit: { type: Number, default: 0 },
    passingScore: { type: Number, required: true, default: 80 },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

quizSchema.index({ lesson: 1 });

export const QuizModel = model<IQuiz>(DOCUMENT_NAME, quizSchema);