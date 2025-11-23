import { IProgressRepository } from "./progress.interface";
import { NotFoundError } from "../../core/error.response";
import { GamificationService } from "../gamification/gamification.service";
import { ILessonRepository } from "../lesson/lesson.interface";

export class ProgressService {
  constructor(
    private readonly progressRepo: IProgressRepository,
    private readonly lessonRepo: ILessonRepository,
    private readonly gamificationService: GamificationService
  ) {}

  async createInitialProgress(
    userId: string,
    courseId: string,
    enrollmentId: string
  ) {
    return await this.progressRepo.create({
      user: userId,
      course: courseId,
      enrollment: enrollmentId,
      completedLessons: [],
      percentCompleted: 0,
    });
  }

  async getProgress(userId: string, courseId: string) {
    const progress = await this.progressRepo.findByUserAndCourse(
      userId,
      courseId
    );
    if (!progress)
      throw new NotFoundError("Progress not found. Are you enrolled?");
    return progress;
  }

  async markLessonCompleted(
    userId: string,
    courseId: string,
    lessonId: string
  ) {
    const progress = await this.progressRepo.addCompletedLesson(
      userId,
      courseId,
      lessonId
    );
    if (!progress) throw new NotFoundError("Progress not found");

    await this.gamificationService.earnPoints(userId, 10);

    const totalLessons = await this.lessonRepo.countByCourse(courseId);

    if (totalLessons === 0) {
      return { ...progress, percentCompleted: 100 };
    }

    const completedCount = progress.completedLessons.length;
    const percent = Math.min(
      100,
      Math.round((completedCount / totalLessons) * 100)
    );

    await this.progressRepo.updatePercent(progress._id as string, percent);

    if (percent === 100) {
      await this.gamificationService.earnPoints(userId, 100);
    }

    return { ...progress, percentCompleted: percent };
  }
}
