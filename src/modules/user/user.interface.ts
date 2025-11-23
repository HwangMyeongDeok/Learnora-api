import { Document } from "mongoose";

export enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin"
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  socialLinks: { platform: string; url: string }[];
  
  authType: 'local' | 'google' | 'facebook';
  googleId?: string;
  facebookId?: string;
  isVerified: boolean;
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserRepository {
  create(data: any): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  update(id: string, data: any): Promise<IUser | null>;
  
  findAll(query: any): Promise<IUser[]>;
  countAll(query: any): Promise<number>;
}