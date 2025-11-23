import { Document, Types } from "mongoose";

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded"
}

export enum PaymentGateway {
  STRIPE = "stripe",
  PAYPAL = "paypal",
  VNPAY = "vnpay",
  MOMO = "momo"
}

export interface IPayment extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  amount: number;
  currency: string;
  status: PaymentStatus;
  gateway: PaymentGateway;
  transactionId: string;
  metadata?: any;     
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPaymentRepository {
  create(data: any): Promise<IPayment>;
  findById(id: string): Promise<IPayment | null>;
  findByTransactionId(trxId: string): Promise<IPayment | null>;
  updateStatus(id: string, status: PaymentStatus): Promise<IPayment | null>;
  findByUser(userId: string): Promise<IPayment[]>;
}