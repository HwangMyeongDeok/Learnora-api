import { Document, Types } from "mongoose";

export enum EnrollmentStatus {
  ACTIVE = "active",       
  COMPLETED = "completed", 
  REFUNDED = "refunded",  
  EXPIRED = "expired"   
}

export interface IEnrollment extends Document {
  _id: Types.ObjectId;
  student: Types.ObjectId;
  course: Types.ObjectId;
  status: EnrollmentStatus;
  enrolledAt: Date;
  pricePaid: number;
  couponCode?: string;
  completedAt?: Date;
  lastAccessed?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEnrollmentRepository {
  create(data: any): Promise<IEnrollment>;
  
  findCheck(studentId: string, courseId: string): Promise<IEnrollment | null>;
  
  findByStudent(studentId: string, query?: any): Promise<IEnrollment[]>;
  
  update(id: string, data: any): Promise<IEnrollment | null>;
}