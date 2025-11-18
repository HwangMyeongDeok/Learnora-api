import { Router } from "express";
import {
  createEnrollment,
  getEnrollmentsByStudent,
  getEnrollmentsByCourse,
  updateEnrollment,
  deleteEnrollment,
} from "./enrollment.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateEnrollmentDto } from "./dtos/create-enrollment.dto";
import { UpdateEnrollmentDto } from "./dtos/update-enrollment.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateEnrollmentDto), createEnrollment);
router.get("/student/:studentId", isAuthenticated, getEnrollmentsByStudent);
router.get("/course/:courseId", isAuthenticated, getEnrollmentsByCourse);
router.put("/:id", isAuthenticated, validateMiddleware(UpdateEnrollmentDto), updateEnrollment);
router.delete("/:id", isAuthenticated, deleteEnrollment);

export default router;