import { Router } from "express";
import { EnrollmentController } from "./enrollment.controller";
import { EnrollmentService } from "./enrollment.service";
import { EnrollmentRepository } from "./enrollment.repository";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateEnrollmentDto } from "./dtos/create-enrollment.dto";
import { ProgressService } from "../progress/progress.service";
import { ProgressRepository } from "../progress/progress.repository";
import { LessonRepository } from "../lesson/lesson.repository";
import { GamificationService } from "../gamification/gamification.service";
import { GamificationRepository } from "../gamification/gamification.repository";

const router = Router();

const enrollmentRepo = new EnrollmentRepository();
const progressRepo = new ProgressRepository();
const lessonRepo = new LessonRepository(); 
const gamificationRepo = new GamificationRepository();
const gamificationService = new GamificationService(gamificationRepo);
const progressService = new ProgressService(progressRepo, lessonRepo, gamificationService);

const enrollmentService = new EnrollmentService(
  enrollmentRepo,
  progressService
);

const enrollmentController = new EnrollmentController(enrollmentService);


router.get("/", isAuthenticated, enrollmentController.getMyEnrollments);

router.get(
  "/check/:courseId",
  isAuthenticated,
  enrollmentController.checkStatus
);

router.post(
  "/",
  isAuthenticated,
  validateMiddleware(CreateEnrollmentDto),
  enrollmentController.enroll
);

export default router;