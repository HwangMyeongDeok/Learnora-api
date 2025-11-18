import { IQuiz } from "./quiz.interface";
import { IQuizRepository } from "../../domain/quiz/quiz.repository.interface";
import { Quiz } from "./quiz.model";

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