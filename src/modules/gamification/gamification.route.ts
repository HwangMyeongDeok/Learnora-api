import { Router } from "express";
import { getGamification, addPoints, addBadge, updatePoints } from "./gamification.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { UpdatePointsDto } from "../../modules/gamification/dtos/update-points.dto";

const router = Router();

router.get("/", isAuthenticated, getGamification);
router.post("/points", isAuthenticated, addPoints);
router.post("/badge", isAuthenticated, addBadge);
router.put("/points/:userId", validateMiddleware(UpdatePointsDto), updatePoints);

export default router;