import { ICommentRepository } from "../../domain/comment/comment.repository";

export class GetCommentsByLectureUseCase {
  constructor(private repo: ICommentRepository) {}

  async execute(lectureId: string) {
    return await this.repo.findByLecture(lectureId);
  }
}