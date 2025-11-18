import { ICourse, CourseLevel, CourseStatus } from "./course.interface"; // Nhớ move về cùng folder
import { ICourseRepository } from "./course.interface"; // Gộp interface repo vào chung file interface hoặc để riêng tùy bạn

// Định nghĩa interface cho Search Filters ngay tại đây hoặc trong file interface
export interface SearchFilters {
  keyword?: string;
  category?: string;
  level?: CourseLevel;
  priceRange?: [number, number];
  status?: CourseStatus;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export class CourseService {
  constructor(private readonly courseRepo: ICourseRepository) {}

  // =================================================================
  // 1. CREATE & UPDATE
  // =================================================================
  async createCourse(data: Partial<ICourse>): Promise<ICourse> {
    // Tech Lead Note: Có thể thêm logic tự động tạo Slug từ Title ở đây
    return await this.courseRepo.create(data);
  }

  async updateCourse(courseId: string, data: Partial<ICourse>): Promise<ICourse | null> {
    // Check tồn tại trước khi update
    const course = await this.courseRepo.findById(courseId);
    if (!course) {
        // throw new ErrorHandler("Course not found", 404);
        return null; 
    }
    return await this.courseRepo.update(courseId, data);
  }

  async updateCourseStatus(id: string, status: CourseStatus): Promise<ICourse | null> {
    return await this.courseRepo.updateStatus(id, status);
  }

  // =================================================================
  // 2. DELETE
  // =================================================================
  async deleteCourse(courseId: string): Promise<void> {
    // Tech Lead Note: Cân nhắc Soft Delete (đánh dấu đã xóa) thay vì xóa thật
    await this.courseRepo.delete(courseId);
  }

  // =================================================================
  // 3. GET SINGLE COURSE
  // =================================================================
  async getCourseById(courseId: string): Promise<ICourse | null> {
    const course = await this.courseRepo.findById(courseId);
    // Có thể throw error ở đây nếu muốn strict mode
    return course;
  }

  async getCourseBySlug(slug: string): Promise<ICourse | null> {
    return await this.courseRepo.findBySlug(slug);
  }

  // =================================================================
  // 4. GET LISTS (Query, Pagination, Filter)
  // =================================================================
  async getAllCourses(): Promise<ICourse[]> {
    // WARNING: Hàm này nguy hiểm nếu DB lớn. Chỉ dùng cho Admin hoặc Dropdown nhỏ.
    return await this.courseRepo.findAll();
  }

  async getCoursesPaginated({ page, limit }: PaginationParams): Promise<ICourse[]> {
    return await this.courseRepo.findAllPaginated(page, limit);
  }

  async getCoursesByInstructor(instructorId: string): Promise<ICourse[]> {
    return await this.courseRepo.findByInstructor(instructorId);
  }

  // =================================================================
  // 5. ADVANCED FEATURES (Search, Popular, Related)
  // =================================================================
  async searchCourses(filters: SearchFilters): Promise<ICourse[]> {
    // Logic search phức tạp sẽ nằm ở Repo, Service chỉ gọi xuống
    return await this.courseRepo.search(filters);
  }

  async getPopularCourses(limit: number): Promise<ICourse[]> {
    return await this.courseRepo.findPopular(limit);
  }

  async getRelatedCourses(courseId: string): Promise<ICourse[]> {
    // Logic gợi ý khóa học liên quan (dựa trên Tag hoặc Category)
    return await this.courseRepo.findRelated(courseId);
  }
}