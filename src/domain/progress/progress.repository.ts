import { IProgress } from "./progress.interface";

export interface IProgressRepository {
  create(data: Partial<IProgress>): Promise<IProgress>;
  findByEnrollment(enrollmentId: string): Promise<IProgress[]>;
  update(id: string, data: Partial<IProgress>): Promise<IProgress | null>;
  delete(id: string): Promise<void>;
}