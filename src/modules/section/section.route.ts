import { Router } from "express";
import {
  createSection,
  getSectionsByCourse,
  updateSection,
  deleteSection,
} from "./section.controller";

import { validateMiddleware } from "../../middleware/validation";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateSectionDto } from "./dtos/create-section.dto";
import { UpdateSectionDto } from "./dtos/update-section.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateSectionDto), createSection);
router.get("/:courseId", getSectionsByCourse);
router.put("/:id", isAuthenticated, validateMiddleware(UpdateSectionDto), updateSection);
router.delete("/:id", isAuthenticated, deleteSection);

export default router;