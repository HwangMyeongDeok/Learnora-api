import { ILesson } from "../../domain/lesson/lesson.interface";
import { ILessonRepository } from "../../domain/lesson/lesson.repository.interface";

export class CreateLessonUseCase {
  constructor(private repo: ILessonRepository) {}

  async execute(data: Partial<ILesson>): Promise<ILesson> {
    return await this.repo.create(data);
  }
}