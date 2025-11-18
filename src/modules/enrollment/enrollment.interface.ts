import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ICourse } from "../course/course.interface";

export enum EnrollmentStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  DROPPED = "dropped",
}

export interface IEnrollment {
  _id?: Types.ObjectId;
  student: Types.ObjectId | IUser;
  course: Types.ObjectId | ICourse;
  status: EnrollmentStatus;
  pricePaid: number;
  couponCode?: string;
  enrolledAt: Date;
  completedAt?: Date;
  lastAccessed?: Date;
}