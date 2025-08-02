import { Router } from "express";
import {
  createLiveSession,
  getLiveSessionById,
  getLiveSessionsByCourse,
  updateLiveSession,
  deleteLiveSession,
} from "./liveSession.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateLiveSessionDto } from "../../application/liveSession/dtos/create-livesession.dto";
import { validateMiddleware } from "../../middleware/validation";
import { UpdateLiveSessionDto } from "../../application/liveSession/dtos/update-livesession.dto";

const router = Router();

router.post("/", validateMiddleware(CreateLiveSessionDto), createLiveSession);
router.get("/:id", getLiveSessionById);
router.get("/course/:courseId", getLiveSessionsByCourse);
router.put("/:id", validateMiddleware(UpdateLiveSessionDto), updateLiveSession);
router.delete("/:id", isAuthenticated, deleteLiveSession);

export default router;
