import { Comment } from "../models/comment.model";
import { IComment } from "../../../domain/comment/comment.interface";
import { ICommentRepository } from "../../../domain/comment/comment.repository.interface";

export class CommentRepository implements ICommentRepository {
  async create(data: Partial<IComment>): Promise<IComment> {
    return await Comment.create(data);
  }

  async findByLecture(lectureId: string): Promise<IComment[]> {
    return await Comment.find({ lecture: lectureId }).populate("user replies");
  }

  async delete(commentId: string): Promise<void> {
    await Comment.findByIdAndDelete(commentId);
  }

  async reply(parentId: string, replyId: string): Promise<void> {
    await Comment.findByIdAndUpdate(parentId, { $push: { replies: replyId } });
  }

  async update(id: string, data: Partial<IComment>): Promise<IComment | null> {
  return await Comment.findByIdAndUpdate(id, data, { new: true });
}
}