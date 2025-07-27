import { IProgress } from "../../domain/progress/progress.interface";
import { IProgressRepository } from "../../domain/progress/progress.repository";
export class CreateProgressUseCase {
  constructor(private repo: IProgressRepository) {}

  async execute(data: Partial<IProgress>): Promise<IProgress> {
    return await this.repo.create(data);
  }
}