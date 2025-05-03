import { catchAsyncError } from './../../middleware/catchAsyncError';
import { Router } from "express";
import { registerController, loginController } from "./auth.controller";
import { validateMiddleware } from "../../middleware/validation";
import { RegisterDto } from "../../application/auth/dtos/register.dto";
import { LoginDto } from "../../application/auth/dtos/login.dto";

const router = Router();

router.post("/register", validateMiddleware(RegisterDto), catchAsyncError(registerController));
router.post("/login", validateMiddleware(LoginDto), catchAsyncError(loginController));

export default router;
