import { Router } from "express";
import {
  createCertificate,
  getCertificatesByUser,
  getCertificatesByCourse,
  deleteCertificate,
} from "./certificate.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateCertificateDto } from "../../application/certificate/dtos/create-certificate.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateCertificateDto), createCertificate);
router.get("/user/:userId", isAuthenticated, getCertificatesByUser);
router.get("/course/:courseId", isAuthenticated, getCertificatesByCourse);
router.delete("/:id", isAuthenticated, deleteCertificate);

export default router;