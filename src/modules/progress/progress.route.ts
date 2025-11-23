import { Router } from "express";
import { ProgressController } from "./progress.controller";
import { ProgressService } from "./progress.service";
import { ProgressRepository } from "./progress.repository";
import { LessonRepository } from "../lesson/lesson.repository";

// [THÊM] Import các phần của Gamification
import { GamificationRepository } from "../gamification/gamification.repository";
import { GamificationService } from "../gamification/gamification.service";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { MarkLessonCompletedDto } from "./dtos/update-progress.dto";

const router = Router();

const progressRepo = new ProgressRepository();
const lessonRepo = new LessonRepository();

const gamificationRepo = new GamificationRepository();
const gamificationService = new GamificationService(gamificationRepo);

const progressService = new ProgressService(
    progressRepo, 
    lessonRepo, 
    gamificationService 
);

const progressController = new ProgressController(progressService);

router.get("/:courseId", isAuthenticated, progressController.getProgress);

router.post(
    "/mark-completed", 
    isAuthenticated, 
    validateMiddleware(MarkLessonCompletedDto), 
    progressController.markCompleted
);

export default router;