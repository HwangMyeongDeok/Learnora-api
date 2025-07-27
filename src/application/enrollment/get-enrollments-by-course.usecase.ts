import { IEnrollmentRepository } from "../../domain/enrollment/enrollment.repository";

export class GetEnrollmentsByCourseUseCase {
  constructor(private repo: IEnrollmentRepository) {}

  async execute(courseId: string) {
    return await this.repo.findByCourse(courseId);
  }
}