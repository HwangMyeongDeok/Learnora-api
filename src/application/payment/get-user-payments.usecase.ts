import { IPaymentRepository } from "../../domain/payment/payment.repository.interface";

export class GetUserPaymentsUseCase {
  constructor(private repo: IPaymentRepository) {}

  async execute(userId: string) {
    return await this.repo.findByUser(userId);
  }
}