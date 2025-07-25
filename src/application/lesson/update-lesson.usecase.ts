import { ILesson } from "../../domain/lesson/lesson.interface";
import { ILessonRepository } from "../../domain/lesson/lesson.repository";

export class UpdateLessonUseCase {
  constructor(private repo: ILessonRepository) {}

  async execute(id: string, data: Partial<ILesson>) {
    return await this.repo.update(id, data);
  }
}