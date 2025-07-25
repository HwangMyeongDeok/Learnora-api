import { Request, Response } from "express";
import { LessonRepository } from "../../infrastructure/database/repositories/lesson.repository";
import { CreateLessonUseCase } from "../../application/lesson/create-lesson.usecase";
import { UpdateLessonUseCase } from "../../application/lesson/update-lesson.usecase";
import { GetLessonsByCourseUseCase } from "../../application/lesson/get-lessons-by-course.usecase";
import { DeleteLessonUseCase } from "../../application/lesson/delete-lesson.usecase";

const lessonRepo = new LessonRepository();

export const createLesson = async (req: Request, res: Response) => {
  const usecase = new CreateLessonUseCase(lessonRepo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getLessonsByCourse = async (req: Request, res: Response) => {
  const usecase = new GetLessonsByCourseUseCase(lessonRepo);
  const lessons = await usecase.execute(req.params.courseId);
  res.status(200).json(lessons);
};

export const updateLesson = async (req: Request, res: Response) => {
  const usecase = new UpdateLessonUseCase(lessonRepo);
  const updated = await usecase.execute(req.params.id, req.body);
  if (!updated) res.status(404).json({ message: "Lesson not found" });
  res.status(200).json(updated);
};

export const deleteLesson = async (req: Request, res: Response) => {
  const usecase = new DeleteLessonUseCase(lessonRepo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};