import { ILiveSession } from "../../domain/liveSession/liveSession.interface";
import { ILiveSessionRepository } from "../../domain/liveSession/liveSession.repository";

export class CreateLiveSessionUseCase {
  constructor(private repo: ILiveSessionRepository) {}

  async execute(data: Partial<ILiveSession>) {
    return await this.repo.create(data);
  }
}
