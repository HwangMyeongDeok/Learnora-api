import { ILecture } from "../../../domain/lecture/lecture.interface";
import { ILectureRepository } from "../../../domain/lecture/lecture.repository";
import { Lecture } from "../models/lecture.model";

export class LectureRepository implements ILectureRepository {
  async create(data: Partial<ILecture>): Promise<ILecture> {
    return await Lecture.create(data);
  }

  async findById(id: string): Promise<ILecture | null> {
    return await Lecture.findById(id).populate("section");
  }

  async findBySection(sectionId: string): Promise<ILecture[]> {
    return await Lecture.find({ section: sectionId }).sort({ createdAt: 1 });
  }

  async update(id: string, data: Partial<ILecture>): Promise<ILecture | null> {
    return await Lecture.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await Lecture.findByIdAndDelete(id);
  }
}