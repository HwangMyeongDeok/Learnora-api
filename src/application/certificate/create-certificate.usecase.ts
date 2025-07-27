import { ICertificate } from "../../domain/certificate/certificate.interface";
import { ICertificateRepository } from "../../domain/certificate/certificate.repository";


export class CreateCertificateUseCase {
  constructor(private repo: ICertificateRepository) {}

  async execute(data: Partial<ICertificate>): Promise<ICertificate> {
    return await this.repo.create(data);
  }
}