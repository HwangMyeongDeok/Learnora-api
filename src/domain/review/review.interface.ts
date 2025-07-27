import { Types } from "mongoose";
import { ICourse } from "../course/course.interface";
import { IUser } from "../user/user.interface";

export interface IReview {
  _id?: Types.ObjectId;
  course: Types.ObjectId | ICourse;
  user: Types.ObjectId | IUser;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}