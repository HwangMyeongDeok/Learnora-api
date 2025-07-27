import { ILiveSession } from "../../domain/liveSession/liveSession.interface";
import { ILiveSessionRepository } from "../../domain/liveSession/liveSession.repository";

export class UpdateLiveSessionUseCase {
  constructor(private repo: ILiveSessionRepository) {}

  async execute(id: string, data: Partial<ILiveSession>) {
    return await this.repo.update(id, data);
  }
}