import { Router } from "express";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";
import { QuizRepository } from "./quiz.repository";

// Dependencies
import { ProgressService } from "../progress/progress.service";
import { ProgressRepository } from "../progress/progress.repository";
import { GamificationService } from "../gamification/gamification.service";
import { GamificationRepository } from "../gamification/gamification.repository";
import { LessonRepository } from "../lesson/lesson.repository";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateQuizDto } from "./dtos/create-quiz.dto";
import { SubmitQuizDto } from "./dtos/submit-quiz.dto";

const router = Router();

const lessonRepo = new LessonRepository();
const progressRepo = new ProgressRepository();
const gamiRepo = new GamificationRepository();

const gamiService = new GamificationService(gamiRepo);
const progressService = new ProgressService(progressRepo, lessonRepo, gamiService);

const quizRepo = new QuizRepository();
const quizService = new QuizService(quizRepo, progressService, gamiService);
const quizController = new QuizController(quizService);


router.get("/lesson/:lessonId", isAuthenticated, quizController.getByLesson);

router.post(
    "/", 
    isAuthenticated, 
    validateMiddleware(CreateQuizDto), 
    quizController.create
);

router.post(
    "/submit", 
    isAuthenticated, 
    validateMiddleware(SubmitQuizDto), 
    quizController.submit
);

export default router;