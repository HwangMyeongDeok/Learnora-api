import { LessonModel } from "./lesson.model";
import { ILesson, ILessonRepository } from "./lesson.interface";

export class LessonRepository implements ILessonRepository {
  
  async create(data: any): Promise<ILesson> {
    return await LessonModel.create(data);
  }

  async update(id: string, data: any): Promise<ILesson | null> {
    return await LessonModel.findByIdAndUpdate(id, data, { new: true }).lean<ILesson>();
  }

  async delete(id: string): Promise<void> {
    await LessonModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<ILesson | null> {
    return await LessonModel.findById(id).lean<ILesson>();
  }

  async findBySection(sectionId: string): Promise<ILesson[]> {
    return await LessonModel.find({ section: sectionId })
        .sort({ order: 1 })
        .lean<ILesson[]>();
  }

  async countByCourse(courseId: string): Promise<number> {
    return await LessonModel.countDocuments({ course: courseId });
  }
}