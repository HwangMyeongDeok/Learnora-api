import { Router } from "express";
import {
  createLiveSession,
  getLiveSessionById,
  getLiveSessionsByCourse,
  updateLiveSession,
  deleteLiveSession,
} from "./liveSession.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";

const router = Router();

router.post("/", isAuthenticated, createLiveSession);
router.get("/:id", getLiveSessionById);
router.get("/course/:courseId", getLiveSessionsByCourse);
router.put("/:id", isAuthenticated, updateLiveSession);
router.delete("/:id", isAuthenticated, deleteLiveSession);

export default router;
