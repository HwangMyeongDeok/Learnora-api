import { CommentModel } from "./comment.model";
import { IComment, ICommentRepository } from "./comment.interface";

export class CommentRepository implements ICommentRepository {
  async create(data: any): Promise<IComment> {
    return await CommentModel.create(data);
  }

  async findById(id: string): Promise<IComment | null> {
    return await CommentModel.findById(id).lean<IComment>();
  }

  async update(id: string, content: string): Promise<IComment | null> {
    return await CommentModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    ).lean<IComment>();
  }

  async delete(id: string): Promise<void> {
    await CommentModel.findByIdAndDelete(id);
    await CommentModel.deleteMany({ parentComment: id });
  }

  async findRootsByLesson(
    lessonId: string,
    page: number,
    limit: number
  ): Promise<any> {
    const skip = (page - 1) * limit;

    const comments = await CommentModel.find({
      lesson: lessonId,
      parentComment: null,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name avatar")
      .lean();

    const total = await CommentModel.countDocuments({
      lesson: lessonId,
      parentComment: null,
    });

    return { comments, total, totalPages: Math.ceil(total / limit) };
  }

  async findReplies(commentId: string): Promise<IComment[]> {
    return await CommentModel.find({ parentComment: commentId })
      .sort({ createdAt: 1 })
      .populate("user", "name avatar")
      .lean<IComment[]>();
  }
}
