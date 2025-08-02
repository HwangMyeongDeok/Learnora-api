import { Router } from "express";
import {
  createComment,
  getCommentsByLecture,
  deleteComment,
  replyComment,
  updateComment,
} from "./comment.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateCommentDto } from "../../application/comment/dtos/create-comment.dto";
import { validateMiddleware } from "../../middleware/validation";
import { UpdateCommentDto } from "../../application/comment/dtos/update-comment.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateCommentDto), createComment);
router.get("/lecture/:lectureId", getCommentsByLecture);
router.delete("/:id", isAuthenticated, deleteComment);
router.post("/:id/reply", isAuthenticated, replyComment);
router.put("/:id", isAuthenticated, validateMiddleware(UpdateCommentDto), updateComment);

export default router;