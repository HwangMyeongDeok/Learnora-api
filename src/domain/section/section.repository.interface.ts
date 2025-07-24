import { ISection } from "./section.interface";

export interface ISectionRepository {
  create(data: Partial<ISection>): Promise<ISection>;
  findById(id: string): Promise<ISection | null>;
  findByCourse(courseId: string): Promise<ISection[]>;
  update(id: string, data: Partial<ISection>): Promise<ISection | null>;
  delete(id: string): Promise<void>;
}