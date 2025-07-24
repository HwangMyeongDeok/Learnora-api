import { Request, Response } from "express";
import { RegisterUseCase } from "../../application/auth/register.usecase";
import { LoginUseCase } from "../../application/auth/login.usecase";
import { LogoutUseCase } from "../../application/auth/logout.usecase";
import { ForgotPasswordUseCase } from "../../application/auth/forgot-password.usecase";
import { ChangePasswordUseCase } from "../../application/auth/change-password.usecase";
import { RefreshTokenUseCase } from "../../application/auth/refresh-token.usecase";
import { VerifyOtpUseCase } from "../../application/auth/verify-otp.usecase";

import { UserRepository } from "../../infrastructure/database/repositories/user.repository";
import { AuthRepository } from "../../infrastructure/database/repositories/auth.repository";

const userRepo = new UserRepository();
const authRepo = new AuthRepository();

const registerUseCase = new RegisterUseCase(userRepo);
const loginUseCase = new LoginUseCase(userRepo, authRepo);
const logoutUseCase = new LogoutUseCase(authRepo);
const forgotUseCase = new ForgotPasswordUseCase(userRepo);
const changePasswordUseCase = new ChangePasswordUseCase(userRepo);
const refreshTokenUseCase = new RefreshTokenUseCase(authRepo);
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
  const userId = req.user!.userId;
  await logoutUseCase.execute(userId);
  res.status(204).send();
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  const otp = await forgotUseCase.execute(req.body.email);
  res.status(200).json({ message: "OTP sent to email", otp });
};

export const changePasswordController = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { oldPassword, newPassword } = req.body;
  await changePasswordUseCase.execute({ userId, oldPassword, newPassword });
  res.status(200).json({ message: "Password changed successfully" });
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const result = await refreshTokenUseCase.execute(refreshToken);
  res.status(200).json(result);
};

export const verifyOtpController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const result = await verifyOtpUseCase.execute(email, otp);
  res.status(200).json({ verified: result });
};
