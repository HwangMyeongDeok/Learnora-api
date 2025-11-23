import { PaymentModel } from "./payment.model";
import { IPayment, IPaymentRepository, PaymentStatus } from "./payment.interface";

export class PaymentRepository implements IPaymentRepository {
  
  async create(data: any): Promise<IPayment> {
    return await PaymentModel.create(data);
  }

  async findById(id: string): Promise<IPayment | null> {
    return await PaymentModel.findById(id).lean<IPayment>();
  }

  async findByTransactionId(trxId: string): Promise<IPayment | null> {
    return await PaymentModel.findOne({ transactionId: trxId }).lean<IPayment>();
  }

  async updateStatus(id: string, status: PaymentStatus): Promise<IPayment | null> {
    return await PaymentModel.findByIdAndUpdate(
        id, 
        { status }, 
        { new: true }
    ).lean<IPayment>();
  }

  async findByUser(userId: string): Promise<IPayment[]> {
    return await PaymentModel.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate("course", "title thumbnail")
        .lean<IPayment[]>();
  }
}