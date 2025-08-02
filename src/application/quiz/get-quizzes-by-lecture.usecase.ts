import { IQuizRepository } from "../../domain/quiz/quiz.repository.interface";

export class GetQuizzesByLectureUseCase {
  constructor(private repo: IQuizRepository) {}

  async execute(lectureId: string) {
    return await this.repo.findByLecture(lectureId);
  }
}