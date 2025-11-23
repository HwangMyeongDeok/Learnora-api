import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { PaymentRepository } from "./payment.repository";
import { CourseRepository } from "../course/course.repository";
import { EnrollmentService } from "../enrollment/enrollment.service";
import { EnrollmentRepository } from "../enrollment/enrollment.repository";
import { ProgressService } from "../progress/progress.service";
import { ProgressRepository } from "../progress/progress.repository";
import { LessonRepository } from "../lesson/lesson.repository";
import { GamificationService } from "../gamification/gamification.service";
import { GamificationRepository } from "../gamification/gamification.repository";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreatePaymentDto } from "./dtos/create-payment.dto";

const router = Router();

const lessonRepo = new LessonRepository();
const progressRepo = new ProgressRepository();
const gamiRepo = new GamificationRepository();
const gamiService = new GamificationService(gamiRepo);
const progressService = new ProgressService(progressRepo, lessonRepo, gamiService);

const enrollmentRepo = new EnrollmentRepository();
const enrollmentService = new EnrollmentService(enrollmentRepo, progressService);

const courseRepo = new CourseRepository();

const paymentRepo = new PaymentRepository();
const paymentService = new PaymentService(paymentRepo, courseRepo, enrollmentService);

const paymentController = new PaymentController(paymentService);


router.get("/history", isAuthenticated, paymentController.getHistory);

router.post(
    "/create", 
    isAuthenticated, 
    validateMiddleware(CreatePaymentDto), 
    paymentController.create
);

router.post("/webhook/mock", paymentController.mockWebhook);

export default router;