import { ILesson } from "./lesson.interface";

export interface ILessonRepository {
  create(data: Partial<ILesson>): Promise<ILesson>;
  findById(id: string): Promise<ILesson | null>;
  findByCourse(courseId: string): Promise<ILesson[]>;
  update(id: string, data: Partial<ILesson>): Promise<ILesson | null>;
  delete(id: string): Promise<void>;
} 