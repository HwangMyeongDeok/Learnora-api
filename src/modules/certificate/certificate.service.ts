import { ICertificate } from "./certificate.interface"; // Nhớ move file interface về cùng folder
import { ICertificateRepository } from "./certificate.interface"; // Gộp chung hoặc tách file tùy bạn, nhưng phải ở trong module

// import { CreateCertificateDto } from "./dtos/create-certificate.dto";

export class CertificateService {
  constructor(private readonly certificateRepo: ICertificateRepository) {}

  // =================================================================
  // 1. CREATE CERTIFICATE
  // =================================================================
  // Tech Lead Note: Sau này logic generate PDF từ HTML sẽ nằm ở đây
  async createCertificate(data: Partial<ICertificate>): Promise<ICertificate> {
    // TODO: Validate xem user đã hoàn thành khóa học 100% chưa trước khi cấp?
    return await this.certificateRepo.create(data);
  }

  // =================================================================
  // 2. GET BY USER (Học viên xem chứng chỉ của mình)
  // =================================================================
  async getCertificatesByUser(userId: string) {
    return await this.certificateRepo.findByUser(userId);
  }

  // =================================================================
  // 3. GET BY COURSE (Giảng viên xem ai đã tốt nghiệp khóa mình)
  // =================================================================
  async getCertificatesByCourse(courseId: string) {
    return await this.certificateRepo.findByCourse(courseId);
  }

  // =================================================================
  // 4. DELETE (Thu hồi chứng chỉ)
  // =================================================================
  async deleteCertificate(id: string): Promise<void> {
    await this.certificateRepo.delete(id);
    // Có thể return thêm message
    // return { message: "Certificate revoked successfully" };
  }
}