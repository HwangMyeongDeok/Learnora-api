import { ILesson } from "./lesson.interface";
import { ILessonRepository } from "../../domain/lesson/lesson.repository.interface";
import { Lesson } from "./lesson.model";

export class LessonRepository implements ILessonRepository {
  async create(data: Partial<ILesson>): Promise<ILesson> {
    return await Lesson.create(data);
  }

  async findById(id: string): Promise<ILesson | null> {
    return await Lesson.findById(id).populate("lecture");
  }

  async findByCourse(courseId: string): Promise<ILesson[]> {
    return await Lesson.find({ course: courseId }).sort({ createdAt: 1 });
  }

  async update(id: string, data: Partial<ILesson>): Promise<ILesson | null> {
    return await Lesson.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await Lesson.findByIdAndDelete(id);
  }
}
