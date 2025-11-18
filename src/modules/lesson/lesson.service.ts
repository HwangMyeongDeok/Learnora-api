import { ILesson } from "./lesson.interface"; // Gộp interface
import { ILessonRepository } from "./lesson.interface"; // Gộp interface repo

// import { publishToQueue } from "../../infrastructure/messageBroker/rabbitmq.producer"; // Import Producer

export class LessonService {
  constructor(private readonly lessonRepo: ILessonRepository) {}

  // =================================================================
  // 1. CREATE LESSON (Quan trọng: Có xử lý Video)
  // =================================================================
  async createLesson(data: Partial<ILesson>): Promise<ILesson> {
    // Bước 1: Lưu thông tin bài học vào DB (Video URL lúc này có thể là link raw S3 hoặc rỗng)
    const lesson = await this.lessonRepo.create(data);

    // Bước 2: [NÂNG CAO] Nếu có videoUrl, đẩy Job vào RabbitMQ để worker xử lý
    /*
    if (data.videoUrl) {
        await publishToQueue('video.process', {
            lessonId: lesson._id,
            videoPath: data.videoUrl, // Link file gốc
            action: 'transcode' // Nén video
        });
        // Worker sau khi nén xong sẽ gọi ngược lại updateLesson để cập nhật URL mới
    }
    */

    return lesson;
  }

  // =================================================================
  // 2. GET BY COURSE (Lấy danh sách bài học)
  // =================================================================
  async getLessonsByCourse(courseId: string) {
    // Tech Lead Note: Nên sắp xếp theo thứ tự (order)
    // return await this.lessonRepo.findByCourse(courseId, { sort: { order: 1 } });
    return await this.lessonRepo.findByCourse(courseId);
  }

  // =================================================================
  // 3. UPDATE LESSON
  // =================================================================
  async updateLesson(id: string, data: Partial<ILesson>) {
    return await this.lessonRepo.update(id, data);
  }

  // =================================================================
  // 4. DELETE LESSON
  // =================================================================
  async deleteLesson(id: string): Promise<void> {
    // Tech Lead Note: Nếu xóa bài học, nhớ xóa cả video trên Cloud (S3/Cloudinary) để tiết kiệm dung lượng
    await this.lessonRepo.delete(id);
  }
}