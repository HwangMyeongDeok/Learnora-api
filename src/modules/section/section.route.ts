import { Router } from "express";
import { SectionController } from "./section.controller";
import { SectionService } from "./section.service";
import { SectionRepository } from "./section.repository";

import { LessonRepository } from "../lesson/lesson.repository";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateSectionDto } from "./dtos/create-section.dto";
import { UpdateSectionDto } from "./dtos/update-section.dto";

const router = Router();


const sectionRepo = new SectionRepository();
const lessonRepo = new LessonRepository(); 

const sectionService = new SectionService(sectionRepo, lessonRepo);

const sectionController = new SectionController(sectionService);


router.get("/course/:courseId", sectionController.getByCourse);

router.post(
    "/", 
    isAuthenticated, 
    validateMiddleware(CreateSectionDto), 
    sectionController.create
);

router.patch(
    "/:id", 
    isAuthenticated, 
    validateMiddleware(UpdateSectionDto),
    sectionController.update
);

router.delete(
    "/:id", 
    isAuthenticated, 
    sectionController.delete
);

export default router;