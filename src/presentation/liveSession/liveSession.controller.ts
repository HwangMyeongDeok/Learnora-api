import { Request, Response } from "express";
import { LiveSessionRepository } from "../../infrastructure/database/repositories/liveSession.repository";
import { CreateLiveSessionUseCase } from "../../application/liveSession/create-liveSession.usecase";
import { GetLiveSessionByIdUseCase } from "../../application/liveSession/get-liveSession-by-id.usecase";
import { GetLiveSessionsByCourseUseCase } from "../../application/liveSession/get-liveSessions-by-course.usecase";
import { UpdateLiveSessionUseCase } from "../../application/liveSession/update-liveSession.usecase";
import { DeleteLiveSessionUseCase } from "../../application/liveSession/delete-liveSession.usecase";


const repo = new LiveSessionRepository();

export const createLiveSession = async (req: Request, res: Response) => {
  const usecase = new CreateLiveSessionUseCase(repo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getLiveSessionById = async (req: Request, res: Response) => {
  const usecase = new GetLiveSessionByIdUseCase(repo);
  const result = await usecase.execute(req.params.id);
  if (!result) res.status(404).json({ message: "Not found" });
  res.json(result);
};

export const getLiveSessionsByCourse = async (req: Request, res: Response) => {
  const usecase = new GetLiveSessionsByCourseUseCase(repo);
  const result = await usecase.execute(req.params.courseId);
  res.json(result);
};

export const updateLiveSession = async (req: Request, res: Response) => {
  const usecase = new UpdateLiveSessionUseCase(repo);
  const result = await usecase.execute(req.params.id, req.body);
  if (!result) res.status(404).json({ message: "Not found" });
  res.json(result);
};

export const deleteLiveSession = async (req: Request, res: Response) => {
  const usecase = new DeleteLiveSessionUseCase(repo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};
