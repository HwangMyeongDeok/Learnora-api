import { Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { ISection } from "../section/section.interface";
import { ICategory } from "../category/category.interface";

export enum CourseLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum CourseStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export interface ICourse {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  description: string;
  instructor: Types.ObjectId | IUser;
  category: Types.ObjectId | ICategory;
  level: CourseLevel;
  status: CourseStatus;
  price: number; 
  discountPrice?: number;
  thumbnail: string;
  sections: Types.ObjectId[] | ISection[]; 
  language: string;
  duration: number; 
  enrollmentCount: number; 
  averageRating: number;
  createdAt?: Date;
  updatedAt?: Date;
}