import { Types } from "mongoose";
import { ICourse } from "../course/course.interface";
import { IUser } from "./user.interface";

export enum LiveSessionStatus {
  SCHEDULED = "scheduled",
  LIVE = "live",
  ENDED = "ended",
}

export interface ILiveSession {
  _id?: Types.ObjectId;
  course: Types.ObjectId | ICourse;
  instructor: Types.ObjectId | IUser;
  title: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
  status: LiveSessionStatus;
  streamUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}