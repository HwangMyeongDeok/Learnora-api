import { ILectureRepository } from "../../domain/lecture/lecture.repository.interface";

export class GetLecturesBySectionUseCase {
  constructor(private repo: ILectureRepository) {}

  async execute(sectionId: string) {
    return await this.repo.findBySection(sectionId);
  }
}