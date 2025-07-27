import { ILiveSessionRepository } from "../../domain/liveSession/liveSession.repository";

export class DeleteLiveSessionUseCase {
  constructor(private repo: ILiveSessionRepository) {}

  async execute(id: string) {
    await this.repo.delete(id);
  }
}
