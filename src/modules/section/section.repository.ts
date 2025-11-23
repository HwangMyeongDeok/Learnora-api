import { SectionModel } from "./section.model";
import { ISection, ISectionRepository } from "./section.interface";

export class SectionRepository implements ISectionRepository {
  
  async create(data: any): Promise<ISection> {
    return await SectionModel.create(data);
  }

  async update(id: string, data: any): Promise<ISection | null> {
    return await SectionModel.findByIdAndUpdate(id, data, { new: true }).lean<ISection>();
  }

  async delete(id: string): Promise<void> {
    await SectionModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<ISection | null> {
    return await SectionModel.findById(id).lean<ISection>();
  }

  async findByCourse(courseId: string): Promise<ISection[]> {
    return await SectionModel.find({ course: courseId })
        .sort({ order: 1 }) 
        .populate("lessons", "title slug type duration isPreview") 
        .lean<ISection[]>();
  }
}