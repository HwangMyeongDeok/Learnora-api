import { ILiveSessionRepository } from "../../domain/liveSession/liveSession.repository.interface";

export class DeleteLiveSessionUseCase {
  constructor(private repo: ILiveSessionRepository) {}

  async execute(id: string) {
    await this.repo.delete(id);
  }
}
