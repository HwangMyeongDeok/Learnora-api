import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { UpdateUserDto } from "./dtos/update-user.dto";

const router = Router();

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.get("/me", isAuthenticated, userController.getMe);

router.patch(
    "/me", 
    isAuthenticated, 
    validateMiddleware(UpdateUserDto), 
    userController.updateMe
);

export default router;