import { ILectureRepository } from "../../domain/lecture/lecture.repository";

export class DeleteLectureUseCase {
  constructor(private repo: ILectureRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}