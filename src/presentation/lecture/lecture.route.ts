import { Router } from "express";
import {
  createLecture,
  getLecturesBySection,
  updateLecture,
  deleteLecture,
} from "./lecture.controller";

import { validateMiddleware } from "../../middleware/validation";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateLectureDto } from "../../application/lecture/dtos/create-lecture.dto";
import { UpdateLectureDto } from "../../application/lecture/dtos/update-lecture.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateLectureDto), createLecture);
router.get("/:sectionId", getLecturesBySection);
router.put("/:id", isAuthenticated, validateMiddleware(UpdateLectureDto), updateLecture);
router.delete("/:id", isAuthenticated, deleteLecture);

export default router;