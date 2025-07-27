import { Router } from "express";
import {
  createComment,
  getCommentsByLecture,
  deleteComment,
  replyComment,
} from "./comment.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";

const router = Router();

router.post("/", isAuthenticated, createComment);
router.get("/lecture/:lectureId", getCommentsByLecture);
router.delete("/:id", isAuthenticated, deleteComment);
router.post("/:id/reply", isAuthenticated, replyComment);

export default router;