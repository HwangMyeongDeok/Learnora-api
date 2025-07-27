import { Router } from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationRead,
  deleteNotification,
} from "./notification.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";

const router = Router();

router.post("/", createNotification);
router.get("/", isAuthenticated, getUserNotifications);
router.put("/:id/read", isAuthenticated, markNotificationRead);
router.delete("/:id", isAuthenticated, deleteNotification);

export default router;