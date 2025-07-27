import { Request, Response } from "express";
import { ProgressRepository } from "../../infrastructure/database/repositories/progress.repository";
import { CreateProgressUseCase } from "../../application/progress/create-progress.usecase";
import { GetProgressByEnrollmentUseCase } from "../../application/progress/get-progress-by-enrollment.usecase";
import { UpdateProgressUseCase } from "../../application/progress/update-progress.usecase";
import { DeleteProgressUseCase } from "../../application/progress/delete-progress.usecase";

const repo = new ProgressRepository();

export const createProgress = async (req: Request, res: Response) => {
  const usecase = new CreateProgressUseCase(repo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getProgressByEnrollment = async (req: Request, res: Response) => {
  const usecase = new GetProgressByEnrollmentUseCase(repo);
  const result = await usecase.execute(req.params.enrollmentId);
  res.status(200).json(result);
};

export const updateProgress = async (req: Request, res: Response) => {
  const usecase = new UpdateProgressUseCase(repo);
  const updated = await usecase.execute(req.params.id, req.body);
  if (!updated) res.status(404).json({ message: "Progress not found" });
  res.status(200).json(updated);
};

export const deleteProgress = async (req: Request, res: Response) => {
  const usecase = new DeleteProgressUseCase(repo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};