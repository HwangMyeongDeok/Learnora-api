import { IQuiz } from "../../domain/quiz/quiz.interface";
import { IQuizRepository } from "../../domain/quiz/quiz.repository";


export class CreateQuizUseCase {
  constructor(private repo: IQuizRepository) {}

  async execute(data: Partial<IQuiz>): Promise<IQuiz> {
    return await this.repo.create(data);
  }
}