import { ISectionRepository } from "../../domain/section/section.repository.interface";

export class DeleteSectionUseCase {
  constructor(private repo: ISectionRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}