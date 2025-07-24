import { Router } from "express";
import { catchAsyncError } from "../../middleware/catchAsyncError";
import { validateMiddleware } from "../../middleware/validation";
import { isAuthenticated } from "../../middleware/isAuthenticated";

import {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
  changePasswordController,
  refreshTokenController,
  verifyOtpController,
} from "./auth.controller";

import { RegisterDto } from "../../application/auth/dtos/register.dto";
import { LoginDto } from "../../application/auth/dtos/login.dto";
import { ChangePasswordDto } from "../../application/auth/dtos/change-password.dto";

const router = Router();

router.post(
  "/register",
  validateMiddleware(RegisterDto),
  catchAsyncError(registerController)
);

router.post(
  "/login",
  validateMiddleware(LoginDto),
  catchAsyncError(loginController)
);

router.post("/logout", isAuthenticated, catchAsyncError(logoutController));

router.post("/forgot-password", catchAsyncError(forgotPasswordController));

router.post(
  "/change-password",
  isAuthenticated,
  validateMiddleware(ChangePasswordDto),
  catchAsyncError(changePasswordController)
);

router.post("/refresh-token", catchAsyncError(refreshTokenController));

router.post("/verify-otp", catchAsyncError(verifyOtpController));

export default router;
