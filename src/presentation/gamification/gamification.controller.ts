import { Request, Response } from "express";
import { GamificationRepository } from "../../infrastructure/database/repositories/gamification.repository";
import { GetGamificationUseCase } from "../../application/gamification/get-gamification.usecase";
import { AddPointsUseCase } from "../../application/gamification/add-points.usecase";
import { AddBadgeUseCase } from "../../application/gamification/add-badge.usecase";
import { UpdatePointsUseCase } from "../../application/gamification/update-points.usecase";

const repo = new GamificationRepository();

export const getGamification = async (req: Request, res: Response) => {
  const usecase = new GetGamificationUseCase(repo);
  const result = await usecase.execute(req.user!.userId);
  res.status(200).json(result);
};

export const addPoints = async (req: Request, res: Response) => {
  const usecase = new AddPointsUseCase(repo);
  const result = await usecase.execute(req.user!.userId, req.body.points);
  res.status(200).json(result);
};

export const addBadge = async (req: Request, res: Response) => {
  const usecase = new AddBadgeUseCase(repo);
  const result = await usecase.execute(req.user!.userId, req.body);
  res.status(200).json(result);
};

export const updatePoints = async (req: Request, res: Response) => {
  const useCase = new UpdatePointsUseCase(repo);
  const updated = await useCase.execute(req.user!.userId, req.body.points);
  if (!updated) res.status(404).json({ message: "Not found" });
  res.status(200).json(updated);
};