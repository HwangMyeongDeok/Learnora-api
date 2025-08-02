import { IGamificationRepository } from "../../domain/gamification/gamification.repository.interface";

export class UpdatePointsUseCase {
  constructor(private readonly repo: IGamificationRepository) {}

  async execute(userId: string, points: number) {
    return await this.repo.updatePoints(userId, points);
  }
}