import userRoutes from "../presentation/user/user.route";
import authRoutes from "../presentation/auth/auth.route";
import courseRoutes from "../presentation/course/course.route";
import sectionRoutes from "../presentation/section/section.route";
import lectureRoutes from "../presentation/lecture/lecture.route";
import lessonRoutes from "../presentation/lesson/lesson.route";
import quizRoutes from "../presentation/quiz/quiz.route";

import express from "express";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/sections", sectionRoutes);
router.use("/lectures", lectureRoutes);
router.use("/lessons", lessonRoutes);
router.use("/quizzes", quizRoutes);

export default router;
