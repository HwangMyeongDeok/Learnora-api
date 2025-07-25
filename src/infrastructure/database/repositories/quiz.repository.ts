import { IQuiz } from "../../../domain/quiz/quiz.interface";
import { IQuizRepository } from "../../../domain/quiz/quiz.repository";
import { Quiz } from "../models/quiz.model";

export class QuizRepository implements IQuizRepository {
  async create(data: Partial<IQuiz>): Promise<IQuiz> {
    return await Quiz.create(data);
  }

  async findById(id: string): Promise<IQuiz | null> {
    return await Quiz.findById(id).populate("lecture");
  }

  async findByLecture(lectureId: string): Promise<IQuiz[]> {
    return await Quiz.find({ lecture: lectureId }).sort({ createdAt: 1 });
  }

  async update(id: string, data: Partial<IQuiz>): Promise<IQuiz | null> {
    return await Quiz.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await Quiz.findByIdAndDelete(id);
  }
}