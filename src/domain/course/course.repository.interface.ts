import { CourseLevel, CourseStatus, ICourse } from "./course.interface";

export interface ICourseRepository {
  create(courseData: Partial<ICourse>): Promise<ICourse>;
  findById(id: string): Promise<ICourse | null>;
  findBySlug(slug: string): Promise<ICourse | null>;
  findAll(): Promise<ICourse[]>;
  update(id: string, data: Partial<ICourse>): Promise<ICourse | null>;
  delete(id: string): Promise<void>;

  findAllPaginated(page: number, limit: number): Promise<ICourse[]>;

  search(filters: {
    keyword?: string;
    category?: string;
    level?: CourseLevel;
    priceRange?: [number, number];
    status?: CourseStatus;
  }): Promise<ICourse[]>;

  findByInstructor(instructorId: string): Promise<ICourse[]>;

  updateStatus(id: string, status: CourseStatus): Promise<ICourse | null>;

  findPopular(limit: number): Promise<ICourse[]>;

  findRelated(courseId: string): Promise<ICourse[]>;
}
