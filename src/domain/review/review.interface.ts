import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ICourse } from "../course/course.interface";

export interface IReview {
  _id?: Types.ObjectId;
  course: Types.ObjectId | ICourse;
  user: Types.ObjectId | IUser;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}