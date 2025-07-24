import userRoutes from "../presentation/user/user.route";
import authRoutes from "../presentation/auth/auth.route";
import courseRoutes from "../presentation/course/course.route";
import sectionRoutes from "../presentation/section/section.route";

import express from "express";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/sections", sectionRoutes);

export default router;
