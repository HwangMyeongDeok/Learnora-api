import { IPayment } from "./payment.interface";

export interface IPaymentRepository {
  create(data: Partial<IPayment>): Promise<IPayment>;
  findByUser(userId: string): Promise<IPayment[]>;
  findByTransactionId(txId: string): Promise<IPayment | null>;
}