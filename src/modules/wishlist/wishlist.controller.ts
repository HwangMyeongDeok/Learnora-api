import { Request, Response } from "express";
import { WishlistRepository } from "./wishlist.repository";
import { AddCourseToWishlistUseCase } from "./add-course-to-wishlist.usecase";
import { RemoveCourseFromWishlistUseCase } from "./remove-course-from-wishlist.usecase";
import { GetWishlistUseCase } from "./get-wishlist.usecase";

const repo = new WishlistRepository();

export const addCourseToWishlist = async (req: Request, res: Response) => {
  const usecase = new AddCourseToWishlistUseCase(repo);
  const result = await usecase.execute(req.user!.userId, req.body.courseId);
  res.status(200).json(result);
};

export const removeCourseFromWishlist = async (req: Request, res: Response) => {
  const usecase = new RemoveCourseFromWishlistUseCase(repo);
  const result = await usecase.execute(req.user!.userId, req.params.courseId);
  res.status(200).json(result);
};

export const getWishlist = async (req: Request, res: Response) => {
  const usecase = new GetWishlistUseCase(repo);
  const result = await usecase.execute(req.user!.userId);
  res.status(200).json(result);
};