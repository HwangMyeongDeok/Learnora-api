import { ILiveSessionRepository } from "../../domain/liveSession/liveSession.repository.interface";

export class GetLiveSessionsByCourseUseCase {
  constructor(private repo: ILiveSessionRepository) {}

  async execute(courseId: string) {
    return await this.repo.findByCourse(courseId);
  }
}