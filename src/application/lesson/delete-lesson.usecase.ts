import { ILessonRepository } from "../../domain/lesson/lesson.repository";

export class DeleteLessonUseCase {
  constructor(private repo: ILessonRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}