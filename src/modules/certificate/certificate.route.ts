import { Router } from "express";
import { CertificateController } from "./certificate.controller";
import { CertificateService } from "./certificate.service";
import { CertificateRepository } from "./certificate.repository";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateCertificateDto } from "./dtos/create-certificate.dto";

const router = Router();

const certRepo = new CertificateRepository();
const certService = new CertificateService(certRepo);
const certController = new CertificateController(certService);


router.get("/", isAuthenticated, certController.getMyCertificates);

router.get("/:id", certController.getOne);

router.post(
    "/", 
    isAuthenticated, 
    validateMiddleware(CreateCertificateDto), 
    certController.issue
);

export default router;