import { ICourseRepository } from "../../domain/course/course.repository.interface";
import { ICourse } from "../../domain/course/course.interface";

export class GetCoursesByInstructorUseCase {
  constructor(private readonly courseRepo: ICourseRepository) {}

  async execute(instructorId: string): Promise<ICourse[]> {
    return await this.courseRepo.findByInstructor(instructorId);
  }
}
