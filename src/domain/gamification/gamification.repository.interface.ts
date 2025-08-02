import { IGamification } from "./gamification.interface";

export interface IGamificationRepository {
  getByUser(userId: string): Promise<IGamification | null>;
  addPoints(userId: string, points: number): Promise<IGamification>;
  addBadge(userId: string, badge: IGamification["badges"][0]): Promise<IGamification>;
  updatePoints(userId: string, points: number): Promise<IGamification | null>;
}