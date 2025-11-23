import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { OK } from "../../core/success.response";

export class UserController {
  constructor(private readonly userService: UserService) {}

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.userService.getMyProfile(req.user.userId);
      new OK({
        message: "Get profile success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  updateMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.userService.updateProfile(req.user.userId, req.body);
      new OK({
        message: "Profile updated",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}