import { Document, Types } from "mongoose";

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

export interface ICourse extends Document {
  title: string;
  slug: string; 
  description: string;
  instructor: Types.ObjectId;
  category: Types.ObjectId;
  level: CourseLevel;
  status: CourseStatus;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  language: string;
  duration: number; 
  enrollmentCount: number;
  averageRating: number;
  totalReviews: number;
  tags: string[];
  requirements: string[];
  outcomes: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourseRepository {
  create(data: any): Promise<ICourse>;
  update(id: string, data: any): Promise<ICourse | null>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ICourse | null>;
  findBySlug(slug: string): Promise<ICourse | null>;
  
  findAll(query: any): Promise<{ courses: ICourse[], total: number, totalPages: number }>;
  
  findByInstructor(instructorId: string): Promise<ICourse[]>;
  
  findRelated(courseId: string): Promise<ICourse[]>;
  
  findPopular(limit: number): Promise<ICourse[]>;
}