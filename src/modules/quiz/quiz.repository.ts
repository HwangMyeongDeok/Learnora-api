import { QuizModel } from "./quiz.model";
import { IQuiz, IQuizRepository } from "./quiz.interface";

export class QuizRepository implements IQuizRepository {
  
  async create(data: any): Promise<IQuiz> {
    return await QuizModel.create(data);
  }

  async findById(id: string): Promise<IQuiz | null> {
    return await QuizModel.findById(id).lean<IQuiz>();
  }

  async findByLesson(lessonId: string): Promise<IQuiz | null> {
    return await QuizModel.findOne({ lesson: lessonId }).lean<IQuiz>();
  }

  async update(id: string, data: any): Promise<IQuiz | null> {
    return await QuizModel.findByIdAndUpdate(id, data, { new: true }).lean<IQuiz>();
  }

  async delete(id: string): Promise<void> {
    await QuizModel.findByIdAndDelete(id);
  }
}