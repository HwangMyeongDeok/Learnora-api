import { IQuiz } from "../../domain/quiz/quiz.interface";
import { IQuizRepository } from "../../domain/quiz/quiz.repository";

export class UpdateQuizUseCase {
  constructor(private repo: IQuizRepository) {}

  async execute(id: string, data: Partial<IQuiz>) {
    return await this.repo.update(id, data);
  }
}