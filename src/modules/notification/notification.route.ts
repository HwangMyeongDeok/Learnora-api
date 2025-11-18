import { Router } from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationRead,
  deleteNotification,
} from "./notification.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateNotificationDto } from "./dtos/create-notification.dto";

const router = Router();

router.post("/", validateMiddleware(CreateNotificationDto), createNotification);
router.get("/", isAuthenticated, getUserNotifications);
router.put("/:id/read", isAuthenticated, markNotificationRead);
router.delete("/:id", isAuthenticated, deleteNotification);

export default router;