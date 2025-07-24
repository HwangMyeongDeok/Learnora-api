import { ISection } from "../../domain/section/section.interface";
import { ISectionRepository } from "../../domain/section/section.repository.interface";

export class UpdateSectionUseCase {
  constructor(private repo: ISectionRepository) {}

  async execute(id: string, data: Partial<ISection>) {
    return await this.repo.update(id, data);
  }
}