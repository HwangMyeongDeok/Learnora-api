import { Request, Response, NextFunction } from "express";
import { CommentService } from "./comment.service";
import { CREATED, OK } from "../../core/success.response";

export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.commentService.createComment(req.user.userId, req.body);
      new CREATED({
        message: "Comment posted",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getByLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lessonId } = req.params;
      const result = await this.commentService.getCommentsByLesson(lessonId, req.query);
      new OK({
        message: "Get comments success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getReplies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { commentId } = req.params;
      const result = await this.commentService.getReplies(commentId);
      new OK({
        message: "Get replies success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      const { id } = req.params;
      
      await this.commentService.deleteComment(req.user.userId, id);
      new OK({
        message: "Comment deleted",
        metadata: {},
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}