import { IEnrollment } from "./enrollment.interface";

export interface IEnrollmentRepository {
  create(data: Partial<IEnrollment>): Promise<IEnrollment>;
  findById(id: string): Promise<IEnrollment | null>;
  findByStudent(studentId: string): Promise<IEnrollment[]>;
  findByCourse(courseId: string): Promise<IEnrollment[]>;
  update(id: string, data: Partial<IEnrollment>): Promise<IEnrollment | null>;
  delete(id: string): Promise<void>;
}