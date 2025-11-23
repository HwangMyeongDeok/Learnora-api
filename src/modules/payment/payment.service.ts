import { IPaymentRepository, PaymentGateway, PaymentStatus } from "./payment.interface";
import { BadRequestError, NotFoundError } from "../../core/error.response";
import { v4 as uuidv4 } from 'uuid';

import { CourseRepository } from "../course/course.repository";
import { EnrollmentService } from "../enrollment/enrollment.service";

export class PaymentService {
  constructor(
    private readonly paymentRepo: IPaymentRepository,
    private readonly courseRepo: CourseRepository,
    private readonly enrollmentService: EnrollmentService
  ) {}

  async createPaymentUrl(userId: string, courseId: string, gateway: PaymentGateway) {
    const course = await this.courseRepo.findById(courseId);
    if (!course) throw new NotFoundError("Course not found");

    const { isEnrolled } = await this.enrollmentService.checkEnrollment(userId, courseId);
    if (isEnrolled) throw new BadRequestError("You already own this course");

    const fakeTransactionId = `TRX-${uuidv4()}`; 

    const payment = await this.paymentRepo.create({
        user: userId,
        course: courseId,
        amount: course.discountPrice || course.price, 
        gateway: gateway,
        transactionId: fakeTransactionId,
        status: PaymentStatus.PENDING
    });

    return {
        paymentUrl: `https://fake-gateway.com/pay/${fakeTransactionId}`,
        transactionId: fakeTransactionId
    };
  }

  async handlePaymentSuccess(transactionId: string) {
    const payment = await this.paymentRepo.findByTransactionId(transactionId);
    if (!payment) throw new NotFoundError("Transaction not found");

    if (payment.status === PaymentStatus.COMPLETED) {
        return payment; 
    }

    const updatedPayment = await this.paymentRepo.updateStatus(
        payment._id as string, 
        PaymentStatus.COMPLETED
    );

    await this.enrollmentService.enrollCourse(
        payment.user.toString(), 
        payment.course.toString(), 
        payment.amount
    );

    return updatedPayment;
  }
  
  async getMyHistory(userId: string) {
      return await this.paymentRepo.findByUser(userId);
  }
}