import { IReviewRepository } from "./review.interface";
import { BadRequestError, ForbiddenError } from "../../core/error.response";
import { IEnrollmentRepository } from "../enrollment/enrollment.interface";
import { ICourseRepository } from "../course/course.interface";

export class ReviewService {
  constructor(
    private readonly reviewRepo: IReviewRepository,
    private readonly enrollmentRepo: IEnrollmentRepository, 
    private readonly courseRepo: ICourseRepository      
  ) {}

  async createReview(userId: string, data: any) {
    const { courseId, rating, comment } = data;

    const enrollment = await this.enrollmentRepo.findCheck(userId, courseId);
    if (!enrollment) {
        throw new ForbiddenError("You must enroll in this course to write a review");
    }

    const existing = await this.reviewRepo.checkExist(userId, courseId);
    if (existing) {
        throw new BadRequestError("You have already reviewed this course");
    }

    const review = await this.reviewRepo.create({
        user: userId,
        course: courseId,
        rating,
        comment
    });

    const { avgRating, totalReviews } = await this.reviewRepo.calculateAverageRating(courseId);

    await this.courseRepo.update(courseId, { 
        averageRating: avgRating,
        totalReviews: totalReviews
    });

    return review;
  }

  async getReviewsByCourse(courseId: string, query: any) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 5;
    
    return await this.reviewRepo.findByCourse(courseId, page, limit);
  }
}