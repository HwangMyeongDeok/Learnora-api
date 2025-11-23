import { ICommentRepository } from "./comment.interface";
import { NotFoundError, ForbiddenError } from "../../core/error.response";

export class CommentService {
  constructor(private readonly commentRepo: ICommentRepository) {}

  async createComment(userId: string, dto: any) {
    return await this.commentRepo.create({
        user: userId,
        lesson: dto.lessonId,
        content: dto.content,
        parentComment: dto.parentComment || null
    });
  }

  async getCommentsByLesson(lessonId: string, query: any) {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    return await this.commentRepo.findRootsByLesson(lessonId, page, limit);
  }

  async getReplies(commentId: string) {
    return await this.commentRepo.findReplies(commentId);
  }

  async deleteComment(userId: string, commentId: string) {
    const comment = await this.commentRepo.findById(commentId);
    if (!comment) throw new NotFoundError("Comment not found");

    if (comment.user.toString() !== userId) {
        throw new ForbiddenError("You do not have permission to delete this comment");
    }

    await this.commentRepo.delete(commentId);
  }
}