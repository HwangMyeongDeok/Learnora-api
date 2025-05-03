import errorMiddleware from "../middleware/error";
import userRoutes from "../presentation/user/user.route";
import authRoutes from "../presentation/auth/auth.route";
import express from "express";

const router = express.Router();

router.use("/users", errorMiddleware, userRoutes);
router.use("/auth", authRoutes);

export default router;
