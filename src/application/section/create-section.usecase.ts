import { ISection } from "../../domain/section/section.interface";
import { ISectionRepository } from "../../domain/section/section.repository.interface";


export class CreateSectionUseCase {
  constructor(private repo: ISectionRepository) {}

  async execute(data: Partial<ISection>): Promise<ISection> {
    return await this.repo.create(data);
  }
}