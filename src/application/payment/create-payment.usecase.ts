import { IPayment } from "../../domain/payment/payment.interface";
import { IPaymentRepository } from "../../domain/payment/payment.repository.interface";

export class CreatePaymentUseCase {
  constructor(private repo: IPaymentRepository) {}

  async execute(data: Partial<IPayment>) {
    return await this.repo.create(data);
  }
}