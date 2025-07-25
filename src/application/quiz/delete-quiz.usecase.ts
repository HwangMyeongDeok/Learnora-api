import { IQuizRepository } from "../../domain/quiz/quiz.repository";

export class DeleteQuizUseCase {
  constructor(private repo: IQuizRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}