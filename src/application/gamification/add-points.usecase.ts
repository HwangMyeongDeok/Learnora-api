import { IGamificationRepository } from "../../domain/gamification/gamification.repository.interface";

export class AddPointsUseCase {
  constructor(private repo: IGamificationRepository) {}

  async execute(userId: string, points: number) {
    return await this.repo.addPoints(userId, points);
  }
}
