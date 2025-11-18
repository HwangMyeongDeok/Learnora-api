import { Types } from "mongoose";
import { ICourse } from "../course/course.interface";
import { ILecture } from "../lecture/lecture.interface";

export interface ISection {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  course: Types.ObjectId | ICourse;
  lectures: Types.ObjectId[] | ILecture[];
  order: number; 
  createdAt?: Date;
  updatedAt?: Date;
}