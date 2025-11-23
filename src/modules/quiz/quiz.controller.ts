import { Request, Response, NextFunction } from "express";
import { QuizService } from "./quiz.service";
import { CREATED, OK } from "../../core/success.response";

export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.quizService.createQuiz(req.body);
      new CREATED({
        message: "Quiz created",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getByLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lessonId } = req.params;
      const result = await this.quizService.getQuizByLesson(lessonId);
      new OK({
        message: "Get quiz success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  submit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const { quizId, userAnswers } = req.body;
      const result = await this.quizService.submitQuiz(
          req.user.userId, 
          quizId, 
          userAnswers
      );
      
      new OK({
        message: "Quiz submitted",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}