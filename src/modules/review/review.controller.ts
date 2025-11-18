import { Request, Response } from "express";
import { ReviewRepository } from "./review.repository";
import { CreateReviewUseCase } from "./create-review.usecase";
import { GetReviewsByCourseUseCase } from "./get-reviews-by-course.usecase";
import { UpdateReviewUseCase } from "./update-review.usecase";
import { DeleteReviewUseCase } from "./delete-review.usecase";

const repo = new ReviewRepository();

export const createReview = async (req: Request, res: Response) => {
  const usecase = new CreateReviewUseCase(repo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getReviewsByCourse = async (req: Request, res: Response) => {
  const usecase = new GetReviewsByCourseUseCase(repo);
  const result = await usecase.execute(req.params.courseId);
  res.status(200).json(result);
};

export const updateReview = async (req: Request, res: Response) => {
  const usecase = new UpdateReviewUseCase(repo);
  const updated = await usecase.execute(req.params.id, req.body);
  if (!updated) res.status(404).json({ message: "Review not found" });
  res.status(200).json(updated);
};

export const deleteReview = async (req: Request, res: Response) => {
  const usecase = new DeleteReviewUseCase(repo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};
