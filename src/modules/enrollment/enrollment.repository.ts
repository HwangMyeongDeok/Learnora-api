import { IEnrollment } from "./enrollment.interface";
import { IEnrollmentRepository } from "../../domain/enrollment/enrollment.repository.interface";
import { Enrollment } from "./enrollment.model";


export class EnrollmentRepository implements IEnrollmentRepository {
  async create(data: Partial<IEnrollment>): Promise<IEnrollment> {
    return await Enrollment.create(data);
  }

  async findById(id: string): Promise<IEnrollment | null> {
    return await Enrollment.findById(id).populate("student course");
  }

  async findByStudent(studentId: string): Promise<IEnrollment[]> {
    return await Enrollment.find({ student: studentId }).populate("course");
  }

  async findByCourse(courseId: string): Promise<IEnrollment[]> {
    return await Enrollment.find({ course: courseId }).populate("student");
  }

  async update(id: string, data: Partial<IEnrollment>): Promise<IEnrollment | null> {
    return await Enrollment.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await Enrollment.findByIdAndDelete(id);
  }
}