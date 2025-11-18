import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "./cart.controller";
import { validateMiddleware } from "../../middleware/validation";
import { AddCourseDto } from "./dtos/add-course.dto";
import { RemoveCourseDto } from "./dtos/remove-course.dto";

const router = Router();

router.get("/", isAuthenticated, getCart);
router.post("/add", isAuthenticated, validateMiddleware(AddCourseDto),addToCart);
router.delete("/remove/:courseId", isAuthenticated, validateMiddleware(RemoveCourseDto),removeFromCart);
router.delete("/clear", isAuthenticated, clearCart);

export default router;
