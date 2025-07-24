import { Schema, model } from "mongoose";
import { IComment } from "../../../domain/comment/comment.interface";

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lecture: { type: Schema.Types.ObjectId, ref: "Lecture", required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment" },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export const Comment = model<IComment>("Comment", commentSchema);