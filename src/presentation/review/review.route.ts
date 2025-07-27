import { Router } from "express";
import {
  createReview,
  getReviewsByCourse,
  updateReview,
  deleteReview,
} from "./review.controller";
import { validateMiddleware } from "../../middleware/validation";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateReviewDto } from "../../application/review/dtos/create-review.dto";
import { UpdateReviewDto } from "../../application/review/dtos/update-review.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateReviewDto), createReview);
router.get("/:courseId", getReviewsByCourse);
router.put("/:id", isAuthenticated, validateMiddleware(UpdateReviewDto), updateReview);
router.delete("/:id", isAuthenticated, deleteReview);

export default router;
