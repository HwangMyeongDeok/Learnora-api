import { IGamificationRepository } from "../../domain/gamification/gamification.repository.interface";

export class GetGamificationUseCase {
  constructor(private repo: IGamificationRepository) {}

  async execute(userId: string) {
    return await this.repo.getByUser(userId);
  }
}