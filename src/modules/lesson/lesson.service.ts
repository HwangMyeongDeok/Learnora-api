import { ILessonRepository } from "./lesson.interface";
import { NotFoundError } from "../../core/error.response";

export class LessonService {
  constructor(private readonly lessonRepo: ILessonRepository) {}

  async createLesson(data: any) {
    const lessonData = {
        ...data,
        course: data.courseId,
        section: data.sectionId
    };
    return await this.lessonRepo.create(lessonData);
  }

  async updateLesson(id: string, data: any) {
    const updated = await this.lessonRepo.update(id, data);
    if (!updated) throw new NotFoundError("Lesson not found");
    return updated;
  }

  async deleteLesson(id: string) {
    await this.lessonRepo.delete(id);
  }

  async getLessonById(id: string) {
    const lesson = await this.lessonRepo.findById(id);
    if (!lesson) throw new NotFoundError("Lesson not found");
    return lesson;
  }

  async getLessonsBySection(sectionId: string) {
    return await this.lessonRepo.findBySection(sectionId);
  }
}