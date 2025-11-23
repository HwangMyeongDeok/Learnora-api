import { Request, Response, NextFunction } from "express";
import { LiveSessionService } from "./live-session.service";
import { CREATED, OK } from "../../core/success.response";

export class LiveSessionController {
  constructor(private readonly liveSessionService: LiveSessionService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const sessionData = { ...req.body, instructor: req.user.userId };
      
      const result = await this.liveSessionService.createSession(sessionData);
      new CREATED({
        message: "Live session scheduled",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getByCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const result = await this.liveSessionService.getSessionsByCourse(courseId);
      new OK({
        message: "Get sessions success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.liveSessionService.updateSession(id, req.body);
      new OK({
        message: "Session updated",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.liveSessionService.deleteSession(id);
      new OK({
        message: "Session deleted",
        metadata: {},
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}