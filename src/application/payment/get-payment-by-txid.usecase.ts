import { IPaymentRepository } from "../../domain/payment/payment.repository.interface";

export class GetPaymentByTransactionIdUseCase {
  constructor(private repo: IPaymentRepository) {}

  async execute(txId: string) {
    return await this.repo.findByTransactionId(txId);
  }
}