import { Request, Response, NextFunction } from "express";
import { NotificationService } from "./notification.service";
import { OK } from "../../core/success.response";

export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.notificationService.getMyNotifications(
        req.user.userId, 
        req.query
      );
      
      new OK({
        message: "Get notifications success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  markRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      const { id } = req.params;

      const result = await this.notificationService.markRead(req.user.userId, id);
      new OK({
        message: "Marked as read",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  markAllRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      await this.notificationService.markAllRead(req.user.userId);
      new OK({
        message: "All marked as read",
        metadata: {},
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}