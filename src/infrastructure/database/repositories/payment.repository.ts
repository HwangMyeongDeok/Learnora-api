import { Payment } from "../models/payment.model";
import { IPayment } from "../../../domain/payment/payment.interface";
import { IPaymentRepository } from "../../../domain/payment/payment.repository.interface";

export class PaymentRepository implements IPaymentRepository {
  async create(data: Partial<IPayment>): Promise<IPayment> {
    return await Payment.create(data);
  }

  async findByUser(userId: string): Promise<IPayment[]> {
    return await Payment.find({ user: userId }).populate("course");
  }

  async findByTransactionId(txId: string): Promise<IPayment | null> {
    return await Payment.findOne({ transactionId: txId });
  }
}