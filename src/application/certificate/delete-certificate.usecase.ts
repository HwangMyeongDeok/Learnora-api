import { ICertificateRepository } from "../../domain/certificate/certificate.repository.interface";

export class DeleteCertificateUseCase {
  constructor(private repo: ICertificateRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}