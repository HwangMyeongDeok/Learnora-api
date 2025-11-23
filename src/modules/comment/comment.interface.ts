import { Document, Types } from "mongoose";

export interface IComment extends Document {
  content: string;
  user: Types.ObjectId;
  lesson: Types.ObjectId;
  parentComment?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommentRepository {
  create(data: any): Promise<IComment>;
  findById(id: string): Promise<IComment | null>;
  update(id: string, content: string): Promise<IComment | null>;
  delete(id: string): Promise<void>;
  findRootsByLesson(
    lessonId: string,
    page: number,
    limit: number
  ): Promise<any>;
  findReplies(commentId: string): Promise<IComment[]>;
}
