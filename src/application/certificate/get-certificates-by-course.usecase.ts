import { ICertificateRepository } from "../../domain/certificate/certificate.repository.interface";

export class GetCertificatesByCourseUseCase {
  constructor(private repo: ICertificateRepository) {}

  async execute(courseId: string) {
    return await this.repo.findByCourse(courseId);
  }
}