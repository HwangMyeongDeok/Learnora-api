import { IComment } from "./comment.interface";

export interface ICommentRepository {
  create(data: Partial<IComment>): Promise<IComment>;
  findByLecture(lectureId: string): Promise<IComment[]>;
  delete(commentId: string): Promise<void>;
  reply(parentId: string, replyId: string): Promise<void>;
}
