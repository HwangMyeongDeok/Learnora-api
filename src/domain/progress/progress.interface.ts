import { Types } from "mongoose";
import { ILecture } from "../lecture/lecture.interface";
import { IEnrollment } from "../enrollment/enrollment.interface";

export interface IProgress {
  _id?: Types.ObjectId;
  enrollment: Types.ObjectId | IEnrollment;
  lecture: Types.ObjectId | ILecture;
  completed: boolean;
  completedAt?: Date;
  score?: number;
  durationWatched?: number;
  percent?: number;
}