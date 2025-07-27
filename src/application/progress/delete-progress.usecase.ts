import { IProgressRepository } from "../../domain/progress/progress.repository";

export class DeleteProgressUseCase {
  constructor(private repo: IProgressRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}