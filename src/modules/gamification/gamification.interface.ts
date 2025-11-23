import { Document, Types } from "mongoose";

export interface IBadge {
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface IGamification extends Document {
  user: Types.ObjectId;
  points: number;
  badges: IBadge[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGamificationRepository {
  findOrCreate(userId: string): Promise<IGamification>;
  
  updatePoints(userId: string, points: number): Promise<IGamification>;
  
  addBadge(userId: string, badge: IBadge): Promise<IGamification>;
  
  findLeaderboard(limit: number): Promise<IGamification[]>;
  
}