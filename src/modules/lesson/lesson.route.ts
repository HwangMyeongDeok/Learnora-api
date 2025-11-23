import { Router } from "express";
import { LessonController } from "./lesson.controller";
import { LessonService } from "./lesson.service";
import { LessonRepository } from "./lesson.repository";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateLessonDto } from "./dtos/create-lesson.dto";

const router = Router();

const lessonRepo = new LessonRepository();
const lessonService = new LessonService(lessonRepo);
const lessonController = new LessonController(lessonService);


router.get("/section/:sectionId", lessonController.getBySection);
router.get("/:id", lessonController.getOne);

router.post(
    "/", 
    isAuthenticated, 
    validateMiddleware(CreateLessonDto), 
    lessonController.create
);

router.patch("/:id", isAuthenticated, lessonController.update);
router.delete("/:id", isAuthenticated, lessonController.delete);

export default router;