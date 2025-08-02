import { ILiveSession } from "../../domain/liveSession/liveSession.interface";
import { ILiveSessionRepository } from "../../domain/liveSession/liveSession.repository.interface";

export class UpdateLiveSessionUseCase {
  constructor(private repo: ILiveSessionRepository) {}

  async execute(id: string, data: Partial<ILiveSession>) {
    return await this.repo.update(id, data);
  }
}