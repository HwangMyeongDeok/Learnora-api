import { Router } from "express";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentRepository } from "./comment.repository";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateCommentDto } from "./dtos/create-comment.dto";

const router = Router();

const commentRepo = new CommentRepository();
const commentService = new CommentService(commentRepo);
const commentController = new CommentController(commentService);


router.post(
    "/", 
    isAuthenticated, 
    validateMiddleware(CreateCommentDto), 
    commentController.create
);

router.get("/lesson/:lessonId", commentController.getByLesson);

router.get("/:commentId/replies", commentController.getReplies);

router.delete("/:id", isAuthenticated, commentController.delete);

export default router;