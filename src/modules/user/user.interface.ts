import { authKeys } from './../../../../e-learning_client/src/modules/auth/api/auth.keys';
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
  authType?: 'local' | 'google' | 'facebook';
  googleId?: string; // ID từ Google
  facebookId?: string; // ID từ Facebook
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}