import { IQuiz, IQuizRepository } from "./quiz.interface"; // Gộp interface và repo definition

export class QuizService {
  constructor(private readonly quizRepo: IQuizRepository) {}

  // =================================================================
  // 1. CREATE QUIZ
  // =================================================================
  async createQuiz(data: Partial<IQuiz>): Promise<IQuiz> {
    // Tech Lead Note: Validate logic
    // Ví dụ: Một quiz phải có ít nhất 1 câu hỏi, mỗi câu hỏi phải có ít nhất 2 đáp án
    // if (!data.questions || data.questions.length === 0) {
    //     throw new ErrorHandler("Quiz must have at least one question", 400);
    // }
    
    return await this.quizRepo.create(data);
  }

  // =================================================================
  // 2. GET BY LECTURE (Lấy danh sách bài kiểm tra của bài học)
  // =================================================================
  async getQuizzesByLecture(lectureId: string) {
    // Lưu ý: Nếu em đã merge module Lecture vào Lesson, hãy đổi tên tham số thành lessonId cho đồng bộ
    return await this.quizRepo.findByLecture(lectureId);
  }

  // =================================================================
  // 3. UPDATE QUIZ
  // =================================================================
  async updateQuiz(id: string, data: Partial<IQuiz>) {
    return await this.quizRepo.update(id, data);
  }

  // =================================================================
  // 4. DELETE QUIZ
  // =================================================================
  async deleteQuiz(id: string): Promise<void> {
    await this.quizRepo.delete(id);
  }

  // =================================================================
  // 5. [MISSING] SUBMIT & GRADE QUIZ (Chấm điểm)
  // =================================================================
  // Hàm này chưa có trong UseCase cũ của em, nhưng là hàm quan trọng nhất
  /*
  async submitQuiz(userId: string, quizId: string, answers: any[]) {
      // 1. Lấy đề thi gốc từ DB (có đáp án đúng)
      const quiz = await this.quizRepo.findById(quizId);
      
      // 2. So sánh đáp án user gửi lên vs đáp án đúng
      let score = 0;
      // ... logic tính điểm ...

      // 3. Nếu điểm > 80% -> Update Progress là "Passed"
      // await this.progressService.updateProgress(...)
      
      return { score, passed: score >= quiz.passingScore };
  }
  */
}