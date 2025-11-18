import { Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { ICourse } from "../course/course.interface";

export interface ICertificate {
  _id?: Types.ObjectId;
  user: Types.ObjectId | IUser;
  course: Types.ObjectId | ICourse;
  issuedAt: Date;
  certificateUrl: string; 
}