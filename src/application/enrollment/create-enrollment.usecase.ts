import { IEnrollment } from "../../domain/enrollment/enrollment.interface";
import { IEnrollmentRepository } from "../../domain/enrollment/enrollment.repository";

export class CreateEnrollmentUseCase {
  constructor(private repo: IEnrollmentRepository) {}

  async execute(data: Partial<IEnrollment>): Promise<IEnrollment> {
    return await this.repo.create(data);
  }
}