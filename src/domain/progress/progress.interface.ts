import { Types } from "mongoose";
import { IEnrollment } from "./enrollment.interface";
import { ILecture } from "../lecture/lecture.interface";

export interface IProgress {
  _id?: Types.ObjectId;
  enrollment: Types.ObjectId | IEnrollment;
  lecture: Types.ObjectId | ILecture;
  completed: boolean;
  completedAt?: Date;
  score?: number;
}