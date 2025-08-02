import { Request, Response } from "express";
import { PaymentRepository } from "../../infrastructure/database/repositories/payment.repository";
import { CreatePaymentUseCase } from "../../application/payment/create-payment.usecase";
import { GetUserPaymentsUseCase } from "../../application/payment/get-user-payments.usecase";
import { GetPaymentByTransactionIdUseCase } from "../../application/payment/get-payment-by-txid.usecase";

const repo = new PaymentRepository();

export const createPayment = async (req: Request, res: Response) => {
  const usecase = new CreatePaymentUseCase(repo);
  const result = await usecase.execute({ ...req.body, user: req.user?.userId });
  res.status(201).json(result);
};

export const getUserPayments = async (req: Request, res: Response) => {
  const usecase = new GetUserPaymentsUseCase(repo);
  const result = await usecase.execute(req.user!.userId);
  res.status(200).json(result);
};

export const getPaymentByTxId = async (req: Request, res: Response) => {
  const usecase = new GetPaymentByTransactionIdUseCase(repo);
  const result = await usecase.execute(req.params.txId);
  if (!result) res.status(404).json({ message: "Not found" });
  res.status(200).json(result);
};
