import { Router } from "express";
import {
  createProgress,
  getProgressByEnrollment,
  updateProgress,
  deleteProgress,
} from "./progress.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateProgressDto } from "../../modules/progress/dtos/create-progress.dto";
import { UpdateProgressDto } from "../../modules/progress/dtos/update-progress.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateProgressDto), createProgress);
router.get("/:enrollmentId", isAuthenticated, getProgressByEnrollment);
router.put("/:id", isAuthenticated, validateMiddleware(UpdateProgressDto), updateProgress);
router.delete("/:id", isAuthenticated, deleteProgress);

export default router;