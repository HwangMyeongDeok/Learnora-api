import { Request, Response } from "express";
import { SectionRepository } from "../../infrastructure/database/repositories/section.repository";
import { CreateSectionUseCase } from "../../application/section/create-section.usecase";
import { GetSectionByCourseUseCase } from "../../application/section/get-section-by-course.usecase";
import { UpdateSectionUseCase } from "../../application/section/update-section.usecase";
import { DeleteSectionUseCase } from "../../application/section/delete-section.usecase";

const sectionRepo = new SectionRepository();

export const createSection = async (req: Request, res: Response) => {
  const usecase = new CreateSectionUseCase(sectionRepo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getSectionsByCourse = async (req: Request, res: Response) => {
  const usecase = new GetSectionByCourseUseCase(sectionRepo);
  const sections = await usecase.execute(req.params.courseId);
  res.status(200).json(sections);
};

export const updateSection = async (req: Request, res: Response) => {
  const usecase = new UpdateSectionUseCase(sectionRepo);
  const updated = await usecase.execute(req.params.id, req.body);
  if (!updated) res.status(404).json({ message: "Section not found" });
  res.status(200).json(updated);
};

export const deleteSection = async (req: Request, res: Response) => {
  const usecase = new DeleteSectionUseCase(sectionRepo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};
