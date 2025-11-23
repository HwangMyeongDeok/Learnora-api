import { ProgressModel } from "./progress.model";
import { IProgress, IProgressRepository } from "./progress.interface";
import { Types } from "mongoose";

export class ProgressRepository implements IProgressRepository {
  
  async create(data: any): Promise<IProgress> {
    return await ProgressModel.create(data);
  }

  async findByUserAndCourse(userId: string, courseId: string): Promise<IProgress | null> {
    return await ProgressModel.findOne({ user: userId, course: courseId }).lean<IProgress>();
  }

  async addCompletedLesson(userId: string, courseId: string, lessonId: string): Promise<IProgress | null> {
    const progress = await ProgressModel.findOneAndUpdate(
      { user: userId, course: courseId },
      { 
        $addToSet: { 
            completedLessons: { 
                lessonId: new Types.ObjectId(lessonId), 
                completedAt: new Date() 
            } 
        },
        $set: { lastLessonWatched: new Types.ObjectId(lessonId) } 
      },
      { new: true }
    ).lean<IProgress>();

    return progress;
  }

  async updatePercent(progressId: string, percent: number): Promise<void> {
    await ProgressModel.findByIdAndUpdate(progressId, { percentCompleted: percent });
  }

  async updateLastWatched(userId: string, courseId: string, lessonId: string): Promise<void> {
    await ProgressModel.findOneAndUpdate(
        { user: userId, course: courseId },
        { lastLessonWatched: lessonId }
    );
  }
}