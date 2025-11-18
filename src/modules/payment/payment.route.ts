import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { createPayment, getUserPayments, getPaymentByTxId } from "./payment.controller";
import { CreatePaymentDto } from "./dtos/create-payment.dto";
import { validateMiddleware } from "../../middleware/validation";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreatePaymentDto), createPayment);
router.get("/my", isAuthenticated, getUserPayments);
router.get("/tx/:txId", isAuthenticated, getPaymentByTxId);

export default router;