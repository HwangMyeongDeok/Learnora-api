import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ICourse } from "../course/course.interface";

export interface ICart {
  _id?: Types.ObjectId;
  user: Types.ObjectId | IUser;
  courses: Types.ObjectId[] | ICourse[];
  createdAt?: Date;
  updatedAt?: Date;
}