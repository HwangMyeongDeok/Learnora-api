import { ILessonRepository } from "../../domain/lesson/lesson.repository.interface";

export class GetLessonsByCourseUseCase {
  constructor(private repo: ILessonRepository) {}

  async execute(courseId: string) {
    return await this.repo.findByCourse(courseId);
  }
}