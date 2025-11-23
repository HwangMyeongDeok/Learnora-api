import { Router } from "express";
import { GamificationController } from "./gamification.controller";
import { GamificationService } from "./gamification.service";
import { GamificationRepository } from "./gamification.repository";
import { isAuthenticated } from "../../middleware/isAuthenticated";

const router = Router();

const gamificationRepo = new GamificationRepository();
const gamificationService = new GamificationService(gamificationRepo);
const gamificationController = new GamificationController(gamificationService);


router.get("/leaderboard", gamificationController.getLeaderboard);

router.get("/my-stats", isAuthenticated, gamificationController.getMyStats);



export default router;