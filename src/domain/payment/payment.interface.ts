import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ICourse } from "../course/course.interface";

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface IPayment {
  _id?: Types.ObjectId;
  user: Types.ObjectId | IUser;
  course: Types.ObjectId | ICourse;
  amount: number;
  status: PaymentStatus;
  transactionId: string;
  createdAt?: Date;
}