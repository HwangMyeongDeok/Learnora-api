import { IProgress } from "../../../domain/progress/progress.interface";
import { IProgressRepository } from "../../../domain/progress/progress.repository";
import { Progress } from "../models/progress.model";

export class ProgressRepository implements IProgressRepository {
  async create(data: Partial<IProgress>): Promise<IProgress> {
    return await Progress.create(data);
  }

  async findByEnrollment(enrollmentId: string): Promise<IProgress[]> {
    return await Progress.find({ enrollment: enrollmentId }).populate("lecture");
  }

  async update(id: string, data: Partial<IProgress>): Promise<IProgress | null> {
    return await Progress.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await Progress.findByIdAndDelete(id);
  }
}