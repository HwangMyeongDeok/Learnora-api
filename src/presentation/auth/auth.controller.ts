import { Request, Response } from "express";
import { RegisterUseCase } from "../../application/auth/register.usecase";
import { LoginUseCase } from "../../application/auth/login.usecase";
import { LogoutUseCase } from "../../application/auth/logout.usecase";
import { ForgotPasswordUseCase } from "../../application/auth/forgot-password.usecase";
import { UserRepository } from "../../infrastructure/database/repositories/user.repository";
import { AuthRepository } from "../../infrastructure/database/repositories/auth.repository";

const userRepo = new UserRepository();
const authRepo = new AuthRepository();

const registerUseCase = new RegisterUseCase(userRepo);
const loginUseCase = new LoginUseCase(userRepo, authRepo);
const logoutUseCase = new LogoutUseCase(authRepo);
const forgotUseCase = new ForgotPasswordUseCase(userRepo);

export const registerController = async (req: Request, res: Response) => {
  const result = await registerUseCase.execute(req.body);
  res.status(201).json(result);
};

export const loginController = async (req: Request, res: Response) => {
  const result = await loginUseCase.execute(req.body);
  res.status(200).json(result);
};

export const logoutController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  await logoutUseCase.execute(userId);
  res.status(204).send();
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  const otp = await forgotUseCase.execute(req.body.email);
  res.status(200).json({ message: "OTP sent to email", otp });
};
