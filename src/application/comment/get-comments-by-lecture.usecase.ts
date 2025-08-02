import { ICommentRepository } from "../../domain/comment/comment.repository.interface";

export class GetCommentsByLectureUseCase {
  constructor(private repo: ICommentRepository) {}

  async execute(lectureId: string) {
    return await this.repo.findByLecture(lectureId);
  }
}