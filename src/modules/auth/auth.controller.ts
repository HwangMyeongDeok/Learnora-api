import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { CREATED, OK } from "../../core/success.response";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body);
      new CREATED({
        message: "Registered successfully",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceId = (req.headers["x-device-id"] as string) || "unknown";
      const result = await this.authService.login(req.body, deviceId);
      
      new OK({
        message: "Login successfully",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceId = (req.headers["x-device-id"] as string) || "unknown";
      const result = await this.authService.refreshToken(req.body, deviceId);
      
      new OK({
        message: "Token refreshed",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const deviceId = (req.headers["x-device-id"] as string) || "unknown";
      await this.authService.logout(req.user.userId, deviceId);
      
      new OK({
        message: "Logout successfully",
        metadata: {},
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp } = req.body;
      const result = await this.authService.verifyOtp(email, otp);
      
      new OK({
        message: "OTP Verified",
        metadata: { verified: result },
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await this.authService.forgotPassword(email);
      
      new OK({
        message: "OTP sent to email",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      await this.authService.changePassword({
        userId: req.user.userId,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
      });

      new OK({
        message: "Password changed successfully",
        metadata: {},
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}