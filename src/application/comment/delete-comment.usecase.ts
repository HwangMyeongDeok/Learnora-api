import { ICommentRepository } from "../../domain/comment/comment.repository.interface";

export class DeleteCommentUseCase {
  constructor(private repo: ICommentRepository) {}

  async execute(commentId: string) {
    await this.repo.delete(commentId);
  }
}