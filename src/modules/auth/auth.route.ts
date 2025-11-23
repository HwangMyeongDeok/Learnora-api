import { Router } from "express";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { KeyTokenRepository } from "./key-token.repository"; 
import { UserRepository } from "../user/user.repository"; 

import { validateMiddleware } from "../../middleware/validation";
import { isAuthenticated } from "../../middleware/isAuthenticated";

import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";

const router = Router();

const userRepo = new UserRepository();
const keyTokenRepo = new KeyTokenRepository();

const authService = new AuthService(userRepo, keyTokenRepo);

const authController = new AuthController(authService);


router.post(
  "/register",
  validateMiddleware(RegisterDto),
  authController.register
);

router.post(
  "/login",
  validateMiddleware(LoginDto),
  authController.login
);

router.post(
  "/logout", 
  isAuthenticated, 
  authController.logout
);

router.post(
  "/refresh-token",
  validateMiddleware(RefreshTokenDto),
  authController.refreshToken
);

router.post(
  "/forgot-password", 
  authController.forgotPassword
);

router.post(
  "/verify-otp", 
  authController.verifyOtp
);

router.post(
  "/change-password",
  isAuthenticated,
  validateMiddleware(ChangePasswordDto),
  authController.changePassword
);

export default router;