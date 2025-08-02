import { ILecture } from "../../domain/lecture/lecture.interface";
import { ILectureRepository } from "../../domain/lecture/lecture.repository.interface";


export class CreateLectureUseCase {
  constructor(private repo: ILectureRepository) {}

  async execute(data: Partial<ILecture>): Promise<ILecture> {
    return await this.repo.create(data);
  }
}