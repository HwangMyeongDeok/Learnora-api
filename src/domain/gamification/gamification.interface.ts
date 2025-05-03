import { Types } from "mongoose";
import { IUser } from "./user.interface";

export interface IBadge {
  name: string;
  description: string;
  icon: string; 
}

export interface IGamification {
  _id?: Types.ObjectId;
  user: Types.ObjectId | IUser;
  points: number; 
  badges: IBadge[];
  createdAt?: Date;
  updatedAt?: Date;
}