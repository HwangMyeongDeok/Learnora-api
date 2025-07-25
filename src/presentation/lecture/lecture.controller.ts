import { Request, Response } from "express";
import { LectureRepository } from "../../infrastructure/database/repositories/lecture.repository";
import { CreateLectureUseCase } from "../../application/lecture/create-lecture.usecase";
import { GetLecturesBySectionUseCase } from "../../application/lecture/get-lectures-by-section.usecase";
import { UpdateLectureUseCase } from "../../application/lecture/update-lecture.usecase";
import { DeleteLectureUseCase } from "../../application/lecture/delete-lecture.usecase";

const lectureRepo = new LectureRepository();

export const createLecture = async (req: Request, res: Response) => {
  const usecase = new CreateLectureUseCase(lectureRepo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getLecturesBySection = async (req: Request, res: Response) => {
  const usecase = new GetLecturesBySectionUseCase(lectureRepo);
  const lectures = await usecase.execute(req.params.sectionId);
  res.status(200).json(lectures);
};

export const updateLecture = async (req: Request, res: Response) => {
  const usecase = new UpdateLectureUseCase(lectureRepo);
  const updated = await usecase.execute(req.params.id, req.body);
  if (!updated) res.status(404).json({ message: "Lecture not found" });
  res.status(200).json(updated);
};

export const deleteLecture = async (req: Request, res: Response) => {
  const usecase = new DeleteLectureUseCase(lectureRepo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};
