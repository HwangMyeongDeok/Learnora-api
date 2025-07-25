import { Router } from "express";
import {
  createLesson,
  getLessonsByCourse,
  updateLesson,
  deleteLesson,
} from "./lesson.controller";

import { validateMiddleware } from "../../middleware/validation";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateLessonDto } from "../../application/lesson/dtos/create-lesson.dto";
import { UpdateLessonDto } from "../../application/lesson/dtos/update-lesson.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateLessonDto), createLesson);
router.get("/:courseId", getLessonsByCourse);
router.put("/:id", isAuthenticated, validateMiddleware(UpdateLessonDto), updateLesson);
router.delete("/:id", isAuthenticated, deleteLesson);

export default router;