import { IQuizRepository } from "./quiz.interface";
import { NotFoundError, BadRequestError } from "../../core/error.response";
import { ProgressService } from "../progress/progress.service";
import { GamificationService } from "../gamification/gamification.service";

export class QuizService {
  constructor(
    private readonly quizRepo: IQuizRepository,
    private readonly progressService: ProgressService,
    private readonly gamificationService: GamificationService
  ) {}

  async createQuiz(data: any) {
    const quizData = { ...data, lesson: data.lessonId };
    return await this.quizRepo.create(quizData);
  }

  async getQuizByLesson(lessonId: string) {
    return await this.quizRepo.findByLesson(lessonId);
  }

  async submitQuiz(userId: string, quizId: string, userAnswers: number[][]) {
    const quiz = await this.quizRepo.findById(quizId);
    if (!quiz) throw new NotFoundError("Quiz not found");

    if (userAnswers.length !== quiz.questions.length) {
        throw new BadRequestError("Please answer all questions");
    }

    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index].sort().toString();
        const trueAnswer = question.correctAnswer.sort().toString();
        
        if (userAnswer === trueAnswer) {
            correctCount++;
        }
    });

    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
    const isPassed = scorePercent >= quiz.passingScore;

    if (isPassed) {
        await this.progressService.markLessonCompleted(
            userId, 
            quiz.lesson.toString(), 
            quiz.lesson.toString()
        );

        await this.gamificationService.earnPoints(userId, 50);
    }

    return {
        score: scorePercent,
        totalQuestions: quiz.questions.length,
        correctAnswers: correctCount,
        isPassed,
        message: isPassed ? "Congratulations! You passed." : "Try again!"
    };
  }
}