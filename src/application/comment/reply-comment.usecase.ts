import { IComment } from "../../domain/comment/comment.interface";
import { ICommentRepository } from "../../domain/comment/comment.repository.interface";

export class ReplyCommentUseCase {
  constructor(private repo: ICommentRepository) {}

  async execute(parentId: string, replyData: Partial<IComment>) {
    const reply = await this.repo.create(replyData);
    await this.repo.reply(parentId, reply._id!.toString());
    return reply;
  }
}