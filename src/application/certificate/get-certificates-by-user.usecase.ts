import { ICertificateRepository } from "../../domain/certificate/certificate.repository";

export class GetCertificatesByUserUseCase {
  constructor(private repo: ICertificateRepository) {}

  async execute(userId: string) {
    return await this.repo.findByUser(userId);
  }
}