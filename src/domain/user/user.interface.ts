import { Types } from "mongoose";

export enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  socialLinks?: { platform: string; url: string }[];
  createdAt?: Date;
  updatedAt?: Date;
}