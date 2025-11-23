import { Request, Response, NextFunction } from "express";
import { CertificateService } from "./certificate.service";
import { CREATED, OK } from "../../core/success.response";

export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  issue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      const { courseId, certificateUrl } = req.body;

      const result = await this.certificateService.issueCertificate(
        req.user.userId,
        courseId,
        certificateUrl
      );

      new CREATED({
        message: "Certificate issued successfully",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getMyCertificates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");

      const result = await this.certificateService.getMyCertificates(req.user.userId);

      new OK({
        message: "Get certificates success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.certificateService.getCertificateDetail(id);

      new OK({
        message: "Get certificate detail success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}