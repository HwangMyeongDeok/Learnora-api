import { Router } from "express";
import {
  createQuiz,
  getQuizzesByLecture,
  updateQuiz,
  deleteQuiz,
} from "./quiz.controller";

import { validateMiddleware } from "../../middleware/validation";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateQuizDto } from "./dtos/create-quiz.dto";
import { UpdateQuizDto } from "./dtos/update-quiz.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateQuizDto), createQuiz);
router.get("/:lectureId", getQuizzesByLecture);
router.put("/:id", isAuthenticated, validateMiddleware(UpdateQuizDto), updateQuiz);
router.delete("/:id", isAuthenticated, deleteQuiz);

export default router;