import { ICourseRepository } from "./course.interface";
import { NotFoundError } from "../../core/error.response";

export class CourseService {
  constructor(private readonly courseRepo: ICourseRepository) {}

  async createCourse(data: any) {
    return await this.courseRepo.create(data);
  }

  async updateCourse(id: string, data: any) {
    const updated = await this.courseRepo.update(id, data);
    if (!updated) throw new NotFoundError("Course not found");
    return updated;
  }

  async deleteCourse(id: string) {
    await this.courseRepo.delete(id);
  }

  async getCourseById(id: string) {
    const course = await this.courseRepo.findById(id);
    if (!course) throw new NotFoundError("Course not found");
    return course;
  }

  async getCourseBySlug(slug: string) {
    const course = await this.courseRepo.findBySlug(slug);
    if (!course) throw new NotFoundError("Course not found");
    return course;
  }

  async searchCourses(query: any) {
    return await this.courseRepo.findAll(query);
  }

  async getPopularCourses(limit: number = 10) {
    return await this.courseRepo.findPopular(limit);
  }

  async getRelatedCourses(courseId: string) {
    return await this.courseRepo.findRelated(courseId);
  }
  
  async getInstructorCourses(instructorId: string) {
      return await this.courseRepo.findByInstructor(instructorId);
  }
}