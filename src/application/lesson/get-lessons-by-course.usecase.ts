import { ILessonRepository } from "../../domain/lesson/lesson.repository";

export class GetLessonsByCourseUseCase {
  constructor(private repo: ILessonRepository) {}

  async execute(courseId: string) {
    return await this.repo.findByCourse(courseId);
  }
}