import { Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { ILecture } from "../lecture/lecture.interface";

export interface IComment {
  _id?: Types.ObjectId;
  content: string;
  user: Types.ObjectId | IUser;
  lecture: Types.ObjectId | ILecture;
  parentComment?: Types.ObjectId | IComment;
  replies: Types.ObjectId[] | IComment[];
  createdAt?: Date;
  updatedAt?: Date;
}