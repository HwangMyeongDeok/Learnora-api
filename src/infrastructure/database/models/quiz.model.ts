import { Schema, model } from "mongoose";
import { IQuiz, IQuestion } from "../../../domain/interfaces/quiz.interface";

const questionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
});

const quizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true },
    questions: [questionSchema],
    lecture: { type: Schema.Types.ObjectId, ref: "Lecture", required: true },
    timeLimit: { type: Number },
    passingScore: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Quiz = model<IQuiz>("Quiz", quizSchema);