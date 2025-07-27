import { IEnrollmentRepository } from "../../domain/enrollment/enrollment.repository";

export class DeleteEnrollmentUseCase {
  constructor(private repo: IEnrollmentRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}