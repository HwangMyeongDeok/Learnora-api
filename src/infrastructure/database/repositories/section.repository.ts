import { ISectionRepository } from "../../../domain/section/section.repository.interface";
import { ISection } from "../../../domain/section/section.interface";
import { Section } from "../models/section.model";

export class SectionRepository implements ISectionRepository {
  async create(data: Partial<ISection>): Promise<ISection> {
    return await Section.create(data);
  }

  async findById(id: string): Promise<ISection | null> {
    return await Section.findById(id).populate("course lectures");
  }

  async findByCourse(courseId: string): Promise<ISection[]> {
    return await Section.find({ course: courseId }).sort({ order: 1 }).populate("lectures");
  }

  async update(id: string, data: Partial<ISection>): Promise<ISection | null> {
    return await Section.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await Section.findByIdAndDelete(id);
  }
}