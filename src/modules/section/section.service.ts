import { ISectionRepository } from "./section.interface";
import { NotFoundError } from "../../core/error.response";
import { ILessonRepository } from "../lesson/lesson.interface";

export class SectionService {
  constructor(
    private readonly sectionRepo: ISectionRepository,
    private readonly lessonRepo: ILessonRepository
  ) {}

  async createSection(data: any) {
    const sectionData = {
        ...data,
        course: data.courseId 
    };
    return await this.sectionRepo.create(sectionData);
  }

  async updateSection(id: string, data: any) {
    const updated = await this.sectionRepo.update(id, data);
    if (!updated) throw new NotFoundError("Section not found");
    return updated;
  }

  async deleteSection(id: string) {
    const section = await this.sectionRepo.findById(id);
    if (!section) throw new NotFoundError("Section not found");
    await this.lessonRepo.deleteManyBySection(id);

    await this.sectionRepo.delete(id);
  }

  async getSectionsByCourse(courseId: string) {
    return await this.sectionRepo.findByCourse(courseId);
  }
}