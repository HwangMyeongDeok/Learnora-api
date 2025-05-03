import { Types } from "mongoose";
import { ICourse } from "../course/course.interface";
import { IUser } from "../user/user.interface";

export interface IWishlist {
  _id?: Types.ObjectId;
  user: Types.ObjectId | IUser;
  courses: Types.ObjectId[] | ICourse[];
  createdAt?: Date;
  updatedAt?: Date;
}