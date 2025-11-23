import { Types } from "mongoose";

export enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  socialLinks?: { platform: string; url: string }[];
  authType?: 'local' | 'google' | 'facebook';
  googleId?: string; 
  facebookId?: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserRepository {
  create(user: Partial<IUser>): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  update(id: string, user: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<IUser[]>;
}