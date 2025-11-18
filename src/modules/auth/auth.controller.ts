import { Request, Response } from "express";
import { RegisterUseCase } from "./register.usecase";
import { LoginUseCase } from "./login.usecase";
import { LogoutUseCase } from "./logout.usecase";
import { ForgotPasswordUseCase } from "./forgot-password.usecase";
import { ChangePasswordUseCase } from "./change-password.usecase";
import { RefreshTokenUseCase } from "./refresh-token.usecase";
import { VerifyOtpUseCase } from "./verify-otp.usecase";
import { UserRepository } from "../user/user.repository";
import { AuthRepository } from "./auth.repository";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";

const userRepo = new UserRepository();
const authRepo = new AuthRepository();

const registerUseCase = new RegisterUseCase(userRepo);
const loginUseCase = new LoginUseCase(userRepo, authRepo);
const logoutUseCase = new LogoutUseCase(authRepo);
const forgotUseCase = new ForgotPasswordUseCase(userRepo, authRepo);
const changePasswordUseCase = new ChangePasswordUseCase(userRepo);
const refreshTokenUseCase = new RefreshTokenUseCase(authRepo, userRepo);
const verifyOtpUseCase = new VerifyOtpUseCase(authRepo);

export const registerController = async (req: Request, res: Response) => {
  const result = await registerUseCase.execute(req.body);
  res.status(201).json(result);
};

export const loginController = async (req: Request, res: Response) => {
  const result = await loginUseCase.execute(req.body);
  res.status(200).json(result);
};

export const logoutController = async (req: Request, res: Response) => {
  if (!req.user || !req.user.userId) {
  return res.status(401).json({ message: "Unauthorized" });
}
  const userId = req.user.userId;
  const deviceId = req.deviceId as string || "unknown";
  await logoutUseCase.execute(userId, deviceId);
  res.status(204).send();
};

export const forgotPasswordController = async (req: Request, res: Response) => {
   await forgotUseCase.execute(req.body.email);
  res.status(200).json({ message: "OTP sent to email" });
};

export const changePasswordController = async (req: Request, res: Response) => {
  if (!req.user || !req.user.userId) {
  return res.status(401).json({ message: "Unauthorized" });
}
  const userId = req.user.userId;
  const { oldPassword, newPassword } = req.body;
  await changePasswordUseCase.execute({ userId, oldPassword, newPassword });
  res.status(200).json({ message: "Password changed successfully" });
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const dto = new RefreshTokenDto();
  dto.refreshToken = req.body.refreshToken;
  const result = await refreshTokenUseCase.execute(
    dto,
    req.deviceId as string || "unknown"
  );
  res.status(200).json(result);
};

export const verifyOtpController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const result = await verifyOtpUseCase.execute(email, otp);
  res.status(200).json({ verified: result });
};
