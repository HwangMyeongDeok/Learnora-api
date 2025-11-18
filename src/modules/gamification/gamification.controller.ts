import { Request, Response } from "express";
import { GamificationRepository } from "../../modules/gamification/gamification.repository";
import { GetGamificationUseCase } from "../../modules/gamification/get-gamification.usecase";
import { AddPointsUseCase } from "../../modules/gamification/add-points.usecase";
import { AddBadgeUseCase } from "../../modules/gamification/add-badge.usecase";
import { UpdatePointsUseCase } from "../../modules/gamification/update-points.usecase";

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