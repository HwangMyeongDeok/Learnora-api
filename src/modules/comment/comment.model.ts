import { Schema, model } from "mongoose";
import { IComment } from "./comment.interface";

const DOCUMENT_NAME = "Comment";
const COLLECTION_NAME = "Comments";

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

commentSchema.index({ lesson: 1, createdAt: -1 });

commentSchema.index({ parentComment: 1, createdAt: 1 });

export const CommentModel = model<IComment>(DOCUMENT_NAME, commentSchema);
