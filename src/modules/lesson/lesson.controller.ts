import { Request, Response, NextFunction } from "express";
import { LessonService } from "./lesson.service";
import { CREATED, OK } from "../../core/success.response";

export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.lessonService.createLesson(req.body);
      new CREATED({
        message: "Lesson created",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.lessonService.updateLesson(id, req.body);
      new OK({
        message: "Lesson updated",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.lessonService.deleteLesson(id);
      new OK({
        message: "Lesson deleted",
        metadata: {},
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.lessonService.getLessonById(id);
      new OK({
        message: "Get lesson success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  
  getBySection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sectionId } = req.params;
      const result = await this.lessonService.getLessonsBySection(sectionId);
      new OK({
        message: "Get lessons by section success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}