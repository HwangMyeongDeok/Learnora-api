import { ILecture } from "../../domain/lecture/lecture.interface";
import { ILectureRepository } from "../../domain/lecture/lecture.repository";

export class UpdateLectureUseCase {
  constructor(private repo: ILectureRepository) {}

  async execute(id: string, data: Partial<ILecture>) {
    return await this.repo.update(id, data);
  }
}