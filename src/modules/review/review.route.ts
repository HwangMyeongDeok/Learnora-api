import { Router } from "express";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { ReviewRepository } from "./review.repository";
import { EnrollmentRepository } from "../enrollment/enrollment.repository";
import { CourseRepository } from "../course/course.repository";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateReviewDto } from "./dtos/create-review.dto";

const router = Router();

const reviewRepo = new ReviewRepository();
const enrollmentRepo = new EnrollmentRepository();
const courseRepo = new CourseRepository();

const reviewService = new ReviewService(reviewRepo, enrollmentRepo, courseRepo);
const reviewController = new ReviewController(reviewService);


router.get("/course/:courseId", reviewController.getByCourse);

router.post(
    "/", 
    isAuthenticated, 
    validateMiddleware(CreateReviewDto), 
    reviewController.create
);

export default router;