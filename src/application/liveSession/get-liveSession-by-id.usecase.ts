import { ILiveSessionRepository } from "../../domain/liveSession/liveSession.repository";

export class GetLiveSessionByIdUseCase {
  constructor(private repo: ILiveSessionRepository) {}

  async execute(id: string) {
    return await this.repo.findById(id);
  }
}