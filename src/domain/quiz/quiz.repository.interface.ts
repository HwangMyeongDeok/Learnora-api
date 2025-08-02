import { IQuiz } from "./quiz.interface";

export interface IQuizRepository {
  create(data: Partial<IQuiz>): Promise<IQuiz>;
  findById(id: string): Promise<IQuiz | null>;
  findByLecture(lectureId: string): Promise<IQuiz[]>;
  update(id: string, data: Partial<IQuiz>): Promise<IQuiz | null>;
  delete(id: string): Promise<void>;
}