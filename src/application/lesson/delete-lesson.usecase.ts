import { ILessonRepository } from "../../domain/lesson/lesson.repository.interface";

export class DeleteLessonUseCase {
  constructor(private repo: ILessonRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}