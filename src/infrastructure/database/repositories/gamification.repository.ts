import {
  IGamification,
  IBadge,
} from "../../../domain/gamification/gamification.interface";
import { IGamificationRepository } from "../../../domain/gamification/gamification.repository.interface";
import { Gamification } from "../models/gamification.model";

export class GamificationRepository implements IGamificationRepository {
  async getByUser(userId: string): Promise<IGamification | null> {
    return await Gamification.findOne({ user: userId });
  }

  async addPoints(userId: string, points: number): Promise<IGamification> {
    const gamification = await Gamification.findOneAndUpdate(
      { user: userId },
      { $inc: { points } },
      { new: true, upsert: true }
    );
    return gamification;
  }

  async addBadge(userId: string, badge: IBadge): Promise<IGamification> {
    const gamification = await Gamification.findOneAndUpdate(
      { user: userId },
      { $addToSet: { badges: badge } },
      { new: true, upsert: true }
    );
    return gamification;
  }

  async updatePoints(
    userId: string,
    points: number
  ): Promise<IGamification | null> {
    return await Gamification.findOneAndUpdate(
      { user: userId },
      { $set: { points } },
      { new: true }
    );
  }
}
