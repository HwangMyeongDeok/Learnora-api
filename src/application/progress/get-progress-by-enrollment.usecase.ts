import { IProgressRepository } from "../../domain/progress/progress.repository";

export class GetProgressByEnrollmentUseCase {
  constructor(private repo: IProgressRepository) {}

  async execute(enrollmentId: string) {
    return await this.repo.findByEnrollment(enrollmentId);
  }
}