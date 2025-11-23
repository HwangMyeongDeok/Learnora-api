import { Router } from "express";
import { LiveSessionController } from "./live-session.controller";
import { LiveSessionService } from "./live-session.service";
import { LiveSessionRepository } from "./live-session.repository";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateLiveSessionDto } from "./dtos/create-livesession.dto";

const router = Router();

const sessionRepo = new LiveSessionRepository();
const sessionService = new LiveSessionService(sessionRepo);
const sessionController = new LiveSessionController(sessionService);


router.get("/course/:courseId", isAuthenticated, sessionController.getByCourse);

router.post(
    "/", 
    isAuthenticated, 
    validateMiddleware(CreateLiveSessionDto), 
    sessionController.create
);

router.patch("/:id", isAuthenticated, sessionController.update);

router.delete("/:id", isAuthenticated, sessionController.delete);

export default router;