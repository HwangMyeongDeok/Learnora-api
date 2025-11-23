import { Document, Types } from "mongoose";

export interface ISection extends Document {
  title: string;
  description?: string;
  course: Types.ObjectId;
  order: number;
  lessons?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISectionRepository {
  create(data: any): Promise<ISection>;
  update(id: string, data: any): Promise<ISection | null>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ISection | null>;

  findByCourse(courseId: string): Promise<ISection[]>;
}
