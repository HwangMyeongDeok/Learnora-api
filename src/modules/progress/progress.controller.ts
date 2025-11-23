import { Request, Response, NextFunction } from "express";
import { ProgressService } from "./progress.service";
import { OK } from "../../core/success.response";

export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  getProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      const { courseId } = req.params;

      const result = await this.progressService.getProgress(req.user.userId, courseId);
      new OK({
        message: "Get progress success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  markCompleted = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      const { courseId, lessonId } = req.body;

      const result = await this.progressService.markLessonCompleted(
        req.user.userId, 
        courseId, 
        lessonId
      );

      new OK({
        message: "Lesson completed",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}