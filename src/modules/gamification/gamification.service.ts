import { IGamificationRepository, IBadge } from "./gamification.interface";

export class GamificationService {
  constructor(private readonly gamificationRepo: IGamificationRepository) {}

  async getMyStats(userId: string) {
    return await this.gamificationRepo.findOrCreate(userId);
  }

  async earnPoints(userId: string, points: number) {
    return await this.gamificationRepo.updatePoints(userId, points);
  }

  async earnBadge(userId: string, badgeData: any) {
    const badge: IBadge = {
        name: badgeData.name || "Achievement",
        description: badgeData.description || "You earned a badge",
        icon: badgeData.icon || "🏆",
        earnedAt: new Date()
    };
    return await this.gamificationRepo.addBadge(userId, badge);
  }

  async getLeaderboard(limit: number = 10) {
    return await this.gamificationRepo.findLeaderboard(limit);
  }
}