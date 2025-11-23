import { ICertificateRepository } from "./certificate.interface";
import { ConflictRequestError, NotFoundError } from "../../core/error.response";

export class CertificateService {
  constructor(private readonly certificateRepo: ICertificateRepository) {}

  async issueCertificate(userId: string, courseId: string, certificateUrl: string) {
    const existing = await this.certificateRepo.findByUserAndCourse(userId, courseId);
    if (existing) {
        throw new ConflictRequestError("Certificate already issued for this course");
    }
    return await this.certificateRepo.create({
        user: userId,
        course: courseId,
        certificateUrl
    });
  }

  async getMyCertificates(userId: string) {
    return await this.certificateRepo.findByUser(userId);
  }

  async getCertificateDetail(id: string) {
    const cert = await this.certificateRepo.findById(id);
    if (!cert) throw new NotFoundError("Certificate not found");
    return cert;
  }
}