import { IProgress } from "../../domain/progress/progress.interface";
import { IProgressRepository } from "../../domain/progress/progress.repository";

export class UpdateProgressUseCase {
  constructor(private repo: IProgressRepository) {}

  async execute(id: string, data: Partial<IProgress>) {
    return await this.repo.update(id, data);
  }
}