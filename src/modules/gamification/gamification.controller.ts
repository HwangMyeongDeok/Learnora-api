import { Request, Response, NextFunction } from "express";
import { GamificationService } from "./gamification.service";
import { OK } from "../../core/success.response";

export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  getMyStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.gamificationService.getMyStats(req.user.userId);
      new OK({
        message: "Get stats success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const result = await this.gamificationService.getLeaderboard(limit);
      new OK({
        message: "Get leaderboard success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}