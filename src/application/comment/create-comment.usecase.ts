import { IComment } from "../../domain/comment/comment.interface";
import { ICommentRepository } from "../../domain/comment/comment.repository";


export class CreateCommentUseCase {
  constructor(private repo: ICommentRepository) {}

  async execute(data: Partial<IComment>) {
    return await this.repo.create(data);
  }
}