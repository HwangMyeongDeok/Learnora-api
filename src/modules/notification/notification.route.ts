import { Router } from "express";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { NotificationRepository } from "./notification.repository";
import { isAuthenticated } from "../../middleware/isAuthenticated";

const router = Router();

const notiRepo = new NotificationRepository();
const notiService = new NotificationService(notiRepo);
const notiController = new NotificationController(notiService);


router.get("/", isAuthenticated, notiController.list);
router.patch("/read-all", isAuthenticated, notiController.markAllRead);
router.patch("/:id/read", isAuthenticated, notiController.markRead);

export default router;