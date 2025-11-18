import { IPayment } from "./payment.interface"; // Gộp interface
import { IPaymentRepository } from "./payment.interface";

// Giả sử em dùng EnrollmentService để kích hoạt khóa học sau khi thanh toán xong
// import { EnrollmentService } from "../enrollment/enrollment.service";

export class PaymentService {
  constructor(
    private readonly paymentRepo: IPaymentRepository,
    // private readonly enrollmentService: EnrollmentService
  ) {}

  // =================================================================
  // 1. INITIATE PAYMENT (Tạo giao dịch & Lấy link thanh toán)
  // =================================================================
  async createPayment(data: Partial<IPayment>) {
    // Bước 1: Gọi API bên thứ 3 (Stripe, PayPal, VNPAY, MoMo)
    // const gatewayResponse = await Stripe.paymentIntents.create({ ... });
    
    // Bước 2: Lưu vào DB với trạng thái "PENDING" (Đang chờ)
    const payment = await this.paymentRepo.create({
      ...data,
      status: 'pending', 
      // transactionId: gatewayResponse.id 
    });

    return payment;
  }

  // =================================================================
  // 2. HANDLE WEBHOOK (Cổng thanh toán gọi ngược lại server mình)
  // =================================================================
  // Đây là hàm quan trọng nhất để xác nhận tiền đã về túi chưa
  async handleWebhook(eventData: any) {
    // 1. Verify Signature (Bảo mật: Đảm bảo request này từ Stripe/Momo thật chứ không phải hacker giả mạo)
    
    // 2. Nếu thanh toán THÀNH CÔNG
    if (eventData.status === 'succeeded') {
        // A. Cập nhật trạng thái Payment trong DB thành 'COMPLETED'
        const txId = eventData.transactionId;
        const payment = await this.paymentRepo.updateStatus(txId, 'completed');

        // B. Kích hoạt khóa học cho user (Gọi Enrollment Module)
        // await this.enrollmentService.createEnrollment({
        //    student: payment.userId,
        //    course: payment.courseId
        // });
        
        return { success: true };
    }

    // 3. Nếu THẤT BẠI
    if (eventData.status === 'failed') {
        await this.paymentRepo.updateStatus(eventData.transactionId, 'failed');
    }
  }

  // =================================================================
  // 3. GET BY TRANSACTION ID (Tra cứu giao dịch)
  // =================================================================
  async getPaymentByTransactionId(txId: string) {
    return await this.paymentRepo.findByTransactionId(txId);
  }

  // =================================================================
  // 4. GET USER PAYMENTS (Lịch sử giao dịch)
  // =================================================================
  async getUserPayments(userId: string) {
    return await this.paymentRepo.findByUser(userId);
  }
}