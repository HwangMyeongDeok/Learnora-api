import { Request, Response, NextFunction } from "express";
import { SectionService } from "./section.service";
import { CREATED, OK } from "../../core/success.response";

export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.sectionService.createSection(req.body);
      new CREATED({
        message: "Section created",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.sectionService.updateSection(id, req.body);
      new OK({
        message: "Section updated",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.sectionService.deleteSection(id);
      new OK({
        message: "Section deleted",
        metadata: {},
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getByCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const result = await this.sectionService.getSectionsByCourse(courseId);
      new OK({
        message: "Get sections success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}