import { Document, Types } from "mongoose";

export enum LiveSessionStatus {
  SCHEDULED = "scheduled",
  LIVE = "live",
  ENDED = "ended",
  CANCELLED = "cancelled"
}

export interface ILiveSession extends Document {
  course: Types.ObjectId;
  instructor: Types.ObjectId;
  title: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
  status: LiveSessionStatus;
  streamUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILiveSessionRepository {
  create(data: any): Promise<ILiveSession>;
  update(id: string, data: any): Promise<ILiveSession | null>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ILiveSession | null>;
  
  findByCourse(courseId: string): Promise<ILiveSession[]>;
  
  findUpcomingByInstructor(instructorId: string): Promise<ILiveSession[]>;
}