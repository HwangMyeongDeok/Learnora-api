import { IBadge } from "../../domain/gamification/gamification.interface";
import { IGamificationRepository } from "../../domain/gamification/gamification.repository.interface";

export class AddBadgeUseCase {
  constructor(private repo: IGamificationRepository) {}

  async execute(userId: string, badge: IBadge) {
    return await this.repo.addBadge(userId, badge);
  }
}