import { EnrollmentModel } from "./enrollment.model";
import { IEnrollment, IEnrollmentRepository, EnrollmentStatus } from "./enrollment.interface";

export class EnrollmentRepository implements IEnrollmentRepository {
  
  async create(data: any): Promise<IEnrollment> {
    return await EnrollmentModel.create(data);
  }

  async findCheck(studentId: string, courseId: string): Promise<IEnrollment | null> {
    return await EnrollmentModel.findOne({
        student: studentId,
        course: courseId,
        status: { $in: [EnrollmentStatus.ACTIVE, EnrollmentStatus.COMPLETED] } 
    }).lean<IEnrollment>();
  }

  async findByStudent(studentId: string): Promise<IEnrollment[]> {
    return await EnrollmentModel.find({ 
        student: studentId,
        status: { $ne: EnrollmentStatus.REFUNDED }
    })
    .populate("course", "title thumbnail slug instructor level") 
    .sort({ lastAccessed: -1 }) 
    .lean<IEnrollment[]>();
  }

  async update(id: string, data: any): Promise<IEnrollment | null> {
    return await EnrollmentModel.findByIdAndUpdate(id, data, { new: true }).lean<IEnrollment>();
  }
}