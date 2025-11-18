import { Router } from "express";
import {
  addCourseToWishlist,
  removeCourseFromWishlist,
  getWishlist,
} from "./wishlist.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";

const router = Router();

router.post("/add", isAuthenticated, addCourseToWishlist);
router.delete("/remove/:courseId", isAuthenticated, removeCourseFromWishlist);
router.get("/", isAuthenticated, getWishlist);

export default router;