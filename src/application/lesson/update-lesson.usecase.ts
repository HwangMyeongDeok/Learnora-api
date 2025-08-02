import { ILesson } from "../../domain/lesson/lesson.interface";
import { ILessonRepository } from "../../domain/lesson/lesson.repository.interface";

export class UpdateLessonUseCase {
  constructor(private repo: ILessonRepository) {}

  async execute(id: string, data: Partial<ILesson>) {
    return await this.repo.update(id, data);
  }
}