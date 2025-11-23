import { Request, Response, NextFunction } from "express";
import { PaymentService } from "./payment.service";
import { CREATED, OK } from "../../core/success.response";

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const { courseId, gateway } = req.body;

      const result = await this.paymentService.createPaymentUrl(
        req.user.userId,
        courseId,
        gateway
      );

      new CREATED({
        message: "Payment initialized",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  mockWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { transactionId } = req.body;
      
      const result = await this.paymentService.handlePaymentSuccess(transactionId);

      new OK({
        message: "Payment processed successfully",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  
  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.userId) throw new Error("Unauthorized");
        const result = await this.paymentService.getMyHistory(req.user.userId);
        new OK({
            message: "Get history success",
            metadata: result
        }).send(res);
    } catch (error) {
        next(error);
    }
  }
}