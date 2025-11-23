import { Request, Response, NextFunction } from "express";
import { ReviewService } from "./review.service";
import { CREATED, OK } from "../../core/success.response";

export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.reviewService.createReview(req.user.userId, req.body);
      new CREATED({
        message: "Review submitted",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getByCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const result = await this.reviewService.getReviewsByCourse(courseId, req.query);
      new OK({
        message: "Get reviews success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}