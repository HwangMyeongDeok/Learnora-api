import { catchAsyncError } from '../../middleware/catchAsyncError';
import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "./user.controller";
import { validateMiddleware } from "../../middleware/validation";
import { RegisterDto } from "../auth/dtos/register.dto";

const router = Router();

router.post("/", validateMiddleware(RegisterDto), catchAsyncError(createUserController));
router.get("/", catchAsyncError(getAllUsersController));
router.get("/:id", catchAsyncError(getUserByIdController));
router.put("/:id", catchAsyncError(updateUserController));
router.delete("/:id", catchAsyncError(deleteUserController));

export default router;
