import userRoutes from "../presentation/user/user.route";
import authRoutes from "../presentation/auth/auth.route";
import courseRoutes from "../presentation/course/course.route";
import sectionRoutes from "../presentation/section/section.route";
import lectureRoutes from "../presentation/lecture/lecture.route";
import lessonRoutes from "../presentation/lesson/lesson.route";
import quizRoutes from "../presentation/quiz/quiz.route";
import reviewRoutes from "../presentation/review/review.route";
import progressRoutes from "../presentation/progress/progress.route";
import enrollmentRoutes from "../presentation/enrollment/enrollment.route";
import certificateRoutes from "../presentation/certificate/certificate.route";
import wishlistRoutes from "../presentation/wishlist/wishlist.route";
import notificationRoutes from "../presentation/notification/notification.route";
import commentRoutes from "../presentation/comment/comment.route";
import liveSessionRoutes from "../presentation/liveSession/liveSession.route";
import gamificationRoutes from "../presentation/gamification/gamification.route";
import paymentRoutes from "../presentation/payment/payment.route";
import cartRoutes from "../presentation/cart/cart.route";
import categoryRoutes from "../presentation/category/category.route";

import express from "express";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/sections", sectionRoutes);
router.use("/lectures", lectureRoutes);
router.use("/lessons", lessonRoutes);
router.use("/quizzes", quizRoutes);
router.use("/reviews", reviewRoutes);
router.use("/progress", progressRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/certificates", certificateRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/notifications", notificationRoutes);
router.use("/comments", commentRoutes);
router.use("/live-sessions", liveSessionRoutes);
router.use("/gamification", gamificationRoutes);
router.use("/payments", paymentRoutes);
router.use("/cart", cartRoutes);
router.use("/categories", categoryRoutes);

export default router;
