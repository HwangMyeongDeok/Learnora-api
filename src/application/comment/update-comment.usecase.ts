import { ICommentRepository } from "../../domain/comment/comment.repository.interface";

export class UpdateCommentUseCase {
  constructor(private readonly repo: ICommentRepository) {}

  async execute(id: string, data: Partial<{ content: string }>) {
    return await this.repo.update(id, data);
  }
}
