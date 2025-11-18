import { IReview, IReviewRepository } from "./review.interface"; // Gộp interface

export class ReviewService {
  constructor(private readonly reviewRepo: IReviewRepository) {}

  // =================================================================
  // 1. CREATE REVIEW (Đánh giá khóa học)
  // =================================================================
  async createReview(data: Partial<IReview>): Promise<IReview> {
    // Tech Lead Note: Logic kiểm tra điều kiện (Validation)
    // 1. User đã mua khóa học chưa? (Check Enrollment) -> Nếu chưa, chặn ngay.
    // 2. User đã review khóa này chưa? -> Mỗi người chỉ được review 1 lần.
    
    const review = await this.reviewRepo.create(data);

    // Tech Lead Note: Trigger tính lại điểm trung bình
    // Sau khi tạo review 5 sao, phải gọi hàm tính lại Rating cho Course
    // await this.calculateAverageRating(data.courseId);

    return review;
  }

  // =================================================================
  // 2. GET REVIEWS BY COURSE (Xem đánh giá)
  // =================================================================
  async getReviewsByCourse(courseId: string) {
    // Nên có Pagination (Phân trang) vì một khóa hot có thể có 1000 review
    return await this.reviewRepo.findByCourse(courseId);
  }

  // =================================================================
  // 3. UPDATE REVIEW (Sửa đánh giá)
  // =================================================================
  async updateReview(id: string, data: Partial<IReview>) {
    const updatedReview = await this.reviewRepo.update(id, data);
    
    // Nếu user sửa từ 5 sao xuống 1 sao -> Phải tính lại Average Rating của Course ngay
    // if (updatedReview) {
    //    await this.calculateAverageRating(updatedReview.courseId);
    // }

    return updatedReview;
  }

  // =================================================================
  // 4. DELETE REVIEW
  // =================================================================
  async deleteReview(id: string): Promise<void> {
    // Lấy thông tin review trước khi xóa để biết nó thuộc course nào
    // const review = await this.reviewRepo.findById(id);
    
    await this.reviewRepo.delete(id);

    // Xóa xong cũng phải tính lại điểm trung bình
    // if (review) {
    //    await this.calculateAverageRating(review.courseId);
    // }
  }

  // =================================================================
  // [PRIVATE] CALCULATE AVERAGE RATING (Logic ngầm)
  // =================================================================
  /*
  private async calculateAverageRating(courseId: string) {
      // 1. Lấy tất cả review của course này
      const reviews = await this.reviewRepo.findByCourse(courseId);
      
      // 2. Tính trung bình cộng
      const total = reviews.reduce((sum, r) => sum + r.rating, 0);
      const avg = reviews.length > 0 ? total / reviews.length : 0;

      // 3. Update vào bảng Course (Để khi fetch Course không phải tính lại)
      // await this.courseRepo.update(courseId, { averageRating: avg, totalReviews: reviews.length });
  }
  */
}