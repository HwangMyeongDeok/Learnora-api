import { ILecture } from "./lecture.interface";

export interface ILectureRepository {
  create(data: Partial<ILecture>): Promise<ILecture>;
  findById(id: string): Promise<ILecture | null>;
  findBySection(sectionId: string): Promise<ILecture[]>;
  update(id: string, data: Partial<ILecture>): Promise<ILecture | null>;
  delete(id: string): Promise<void>;
}