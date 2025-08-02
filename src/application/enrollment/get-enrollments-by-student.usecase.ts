import { IEnrollmentRepository } from "../../domain/enrollment/enrollment.repository.interface";

export class GetEnrollmentsByStudentUseCase {
  constructor(private repo: IEnrollmentRepository) {}

  async execute(studentId: string) {
    return await this.repo.findByStudent(studentId);
  }
}