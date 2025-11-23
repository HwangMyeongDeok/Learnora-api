import { Request, Response, NextFunction } from "express";
import { EnrollmentService } from "./enrollment.service";
import { CREATED, OK } from "../../core/success.response";

export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  enroll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const { courseId, pricePaid } = req.body; 

      const result = await this.enrollmentService.enrollCourse(
        req.user.userId,
        courseId,
        pricePaid || 0
      );

      new CREATED({
        message: "Enrolled successfully",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getMyEnrollments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");

      const result = await this.enrollmentService.getMyEnrollments(req.user.userId);

      new OK({
        message: "Get my enrollments success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  checkStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      const { courseId } = req.params;

      const result = await this.enrollmentService.checkEnrollment(req.user.userId, courseId);

      new OK({
        message: "Check status success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}