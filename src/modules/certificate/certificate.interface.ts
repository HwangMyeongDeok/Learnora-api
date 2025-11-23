import { Document, Types } from "mongoose";

export interface ICertificate extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  issuedAt: Date;
  certificateUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICertificateRepository {
  create(data: any): Promise<ICertificate>;
  findByUser(userId: string): Promise<ICertificate[]>;
  findById(id: string): Promise<ICertificate | null>;
  findByUserAndCourse(userId: string, courseId: string): Promise<ICertificate | null>;
}