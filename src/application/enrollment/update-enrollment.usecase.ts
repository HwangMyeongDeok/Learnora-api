import { IEnrollment } from "../../domain/enrollment/enrollment.interface";
import { IEnrollmentRepository } from "../../domain/enrollment/enrollment.repository.interface";

export class UpdateEnrollmentUseCase {
  constructor(private repo: IEnrollmentRepository) {}

  async execute(id: string, data: Partial<IEnrollment>) {
    return await this.repo.update(id, data);
  }
}