import { GamificationModel } from "./gamification.model";
import { IGamification, IGamificationRepository, IBadge } from "./gamification.interface";

export class GamificationRepository implements IGamificationRepository {
  
  async findOrCreate(userId: string): Promise<IGamification> {
    return await GamificationModel.findOneAndUpdate(
        { user: userId },
        { $setOnInsert: { points: 0, badges: [] } },
        { new: true, upsert: true }
    ).lean<IGamification>();
  }

  async updatePoints(userId: string, points: number): Promise<IGamification> {
    return await GamificationModel.findOneAndUpdate(
        { user: userId },
        { $inc: { points: points } }, 
        { new: true, upsert: true }
    ).lean<IGamification>();
  }

  async addBadge(userId: string, badge: IBadge): Promise<IGamification> {
    return await GamificationModel.findOneAndUpdate(
        { user: userId },
        { $push: { badges: badge } }, 
        { new: true, upsert: true }
    ).lean<IGamification>();
  }

  async findLeaderboard(limit: number): Promise<IGamification[]> {
    return await GamificationModel.find()
        .sort({ points: -1 }) 
        .limit(limit)
        .populate("user", "name avatar") 
        .lean<IGamification[]>();
  }
  
}