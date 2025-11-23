import { IEnrollmentRepository } from "./enrollment.interface";
import { ConflictRequestError, NotFoundError } from "../../core/error.response";
import { ProgressService } from "../progress/progress.service"; 

export class EnrollmentService {
  constructor(
    private readonly enrollmentRepo: IEnrollmentRepository,
    private readonly progressService: ProgressService 
  ) {}

  async enrollCourse(studentId: string, courseId: string, pricePaid: number) {
    const existing = await this.enrollmentRepo.findCheck(studentId, courseId);
    if (existing) {
        throw new ConflictRequestError("You already enrolled in this course");
    }

    const enrollment = await this.enrollmentRepo.create({
        student: studentId,
        course: courseId,
        pricePaid: pricePaid
    });

    await this.progressService.createInitialProgress(
        studentId, 
        courseId, 
        enrollment._id.toString() 
    );

    return enrollment;
  }

  async getMyEnrollments(studentId: string) {
    return await this.enrollmentRepo.findByStudent(studentId);
  }

  async checkEnrollment(studentId: string, courseId: string) {
    const enrollment = await this.enrollmentRepo.findCheck(studentId, courseId);
    return { isEnrolled: !!enrollment }; 
  }
}