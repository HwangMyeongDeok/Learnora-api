import { IProgress, IProgressRepository } from "./progress.interface"; // Gộp interface

// Giả sử em sẽ cần gọi các service khác khi tiến độ thay đổi
// import { GamificationService } from "../gamification/gamification.service";
// import { CertificateService } from "../certificate/certificate.service";

export class ProgressService {
  constructor(
    private readonly progressRepo: IProgressRepository,
    // private readonly gamificationService: GamificationService,
    // private readonly certificateService: CertificateService
  ) {}

  // =================================================================
  // 1. CREATE (Khởi tạo tiến độ)
  // =================================================================
  // Hàm này thường được gọi tự động ngay khi User đăng ký khóa học (Enrollment)
  async createProgress(data: Partial<IProgress>): Promise<IProgress> {
    // Mặc định khi tạo mới: completedLessons = [], percent = 0
    return await this.progressRepo.create({
        ...data,
        percent: 0,
        completedLessons: []
    });
  }

  // =================================================================
  // 2. GET BY ENROLLMENT (Lấy tiến độ của 1 khóa học cụ thể)
  // =================================================================
  async getProgressByEnrollment(enrollmentId: string) {
    return await this.progressRepo.findByEnrollment(enrollmentId);
  }

  // =================================================================
  // 3. UPDATE (Cập nhật bài học đã hoàn thành) - QUAN TRỌNG NHẤT
  // =================================================================
  async updateProgress(id: string, data: Partial<IProgress>) {
    // Bước 1: Cập nhật DB
    const updatedProgress = await this.progressRepo.update(id, data);

    // Bước 2: [LOGIC NGHIỆP VỤ CAO CẤP]
    if (updatedProgress) {
        // A. Tính toán lại % hoàn thành
        // const totalLessons = await this.courseRepo.countLessons(updatedProgress.courseId);
        // const completedCount = updatedProgress.completedLessons.length;
        // const newPercent = (completedCount / totalLessons) * 100;
        
        // B. Kiểm tra xem đã hoàn thành khóa học chưa?
        // if (newPercent === 100 && !updatedProgress.isCompleted) {
        //     // 1. Đánh dấu hoàn thành
        //     await this.progressRepo.markAsCompleted(id);
        //     // 2. Cấp chứng chỉ tự động
        //     await this.certificateService.createCertificate({ ... });
        //     // 3. Cộng điểm thưởng lớn
        //     await this.gamificationService.addPoints(updatedProgress.userId, 1000);
        // }
    }

    return updatedProgress;
  }

  // =================================================================
  // 4. DELETE
  // =================================================================
  async deleteProgress(id: string): Promise<void> {
    await this.progressRepo.delete(id);
  }
}