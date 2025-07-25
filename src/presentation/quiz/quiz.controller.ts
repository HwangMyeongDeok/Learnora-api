import { Request, Response } from "express";
import { QuizRepository } from "../../infrastructure/database/repositories/quiz.repository";
import { CreateQuizUseCase } from "../../application/quiz/create-quiz.usecase";
import { GetQuizzesByLectureUseCase } from "../../application/quiz/get-quizzes-by-lecture.usecase";
import { UpdateQuizUseCase } from "../../application/quiz/update-quiz.usecase";
import { DeleteQuizUseCase } from "../../application/quiz/delete-quiz.usecase";

const quizRepo = new QuizRepository();

export const createQuiz = async (req: Request, res: Response) => {
  const usecase = new CreateQuizUseCase(quizRepo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getQuizzesByLecture = async (req: Request, res: Response) => {
  const usecase = new GetQuizzesByLectureUseCase(quizRepo);
  const quizzes = await usecase.execute(req.params.lectureId);
  res.status(200).json(quizzes);
};

export const updateQuiz = async (req: Request, res: Response) => {
  const usecase = new UpdateQuizUseCase(quizRepo);
  const updated = await usecase.execute(req.params.id, req.body);
  if (!updated) res.status(404).json({ message: "Quiz not found" });
  res.status(200).json(updated);
};

export const deleteQuiz = async (req: Request, res: Response) => {
  const usecase = new DeleteQuizUseCase(quizRepo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};