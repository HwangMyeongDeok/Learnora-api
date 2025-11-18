import { Request, Response } from "express";
import { CartRepository } from "./cart.repository";
import { GetCartUseCase } from "./get-cart.usecase";
import { AddToCartUseCase } from "./add-to-cart.usecase";
import { RemoveFromCartUseCase } from "./remove-from-cart.usecase";
import { ClearCartUseCase } from "./clear-cart.usecase";

const repo = new CartRepository();

export const getCart = async (req: Request, res: Response) => {
  const usecase = new GetCartUseCase(repo);
  const result = await usecase.execute(req.user!.userId);
  res.status(200).json(result);
};

export const addToCart = async (req: Request, res: Response) => {
  const usecase = new AddToCartUseCase(repo);
  const result = await usecase.execute(req.user!.userId, req.body.courseId);
  res.status(200).json(result);
};

export const removeFromCart = async (req: Request, res: Response) => {
  const usecase = new RemoveFromCartUseCase(repo);
  const result = await usecase.execute(req.user!.userId, req.params.courseId);
  res.status(200).json(result);
};

export const clearCart = async (req: Request, res: Response) => {
  const usecase = new ClearCartUseCase(repo);
  await usecase.execute(req.user!.userId);
  res.status(204).send();
};


