import { IEnrollment } from "./enrollment.interface"; // Nhớ gộp interface vào module
import { IEnrollmentRepository } from "./enrollment.interface"; // Interface Repo cũng gộp vào đây

// import { CreateEnrollmentDto } from "./dtos/create-enrollment.dto";

export class EnrollmentService {
  constructor(private readonly enrollmentRepo: IEnrollmentRepository) {}

  // =================================================================
  // 1. ENROLL (Ghi danh học viên vào khóa học)
  // =================================================================
  async createEnrollment(data: Partial<IEnrollment>): Promise<IEnrollment> {
    // Tech Lead Note: Logic kiểm tra trùng lặp (Business Logic)
    // Trước khi tạo, phải kiểm tra xem user này đã enroll khóa này chưa?
    // const existing = await this.enrollmentRepo.checkEnrollment(data.student, data.course);
    // if (existing) throw new ErrorHandler("User already enrolled in this course", 400);

    const enrollment = await this.enrollmentRepo.create(data);

    // TODO: Sau này sẽ gọi ProgressService để khởi tạo tiến độ học 0% ngay khi enroll
    // await this.progressService.initProgress(enrollment._id);

    return enrollment;
  }

  // =================================================================
  // 2. GET BY STUDENT (Học viên xem "Khóa học của tôi")
  // =================================================================
  async getEnrollmentsByStudent(studentId: string) {
    return await this.enrollmentRepo.findByStudent(studentId);
  }

  // =================================================================
  // 3. GET BY COURSE (Giảng viên xem danh sách lớp)
  // =================================================================
  async getEnrollmentsByCourse(courseId: string) {
    return await this.enrollmentRepo.findByCourse(courseId);
  }

  // =================================================================
  // 4. UPDATE (Ví dụ: Gia hạn khóa học, Cập nhật trạng thái hoàn thành)
  // =================================================================
  async updateEnrollment(id: string, data: Partial<IEnrollment>) {
    return await this.enrollmentRepo.update(id, data);
  }

  // =================================================================
  // 5. DELETE (Hủy ghi danh / Refund)
  // =================================================================
  async deleteEnrollment(id: string): Promise<void> {
    await this.enrollmentRepo.delete(id);
    // Tech Lead Note: Nếu xóa enrollment, nhớ xóa cả Progress học tập đi kèm nhé
  }
}