import { Request, Response } from "express";
import { CategoryRepository } from "../../infrastructure/database/repositories/category.repository";
import { CreateCategoryUseCase } from "../../application/category/create-category.usecase";
import { GetAllCategoriesUseCase } from "../../application/category/get-all-categories.usecase";
import { GetCategoryByIdUseCase } from "../../application/category/get-category-by-id.usecase";
import { UpdateCategoryUseCase } from "../../application/category/update-category.usecase";
import { DeleteCategoryUseCase } from "../../application/category/delete-category.usecase";

const repo = new CategoryRepository();

export const createCategory = async (req: Request, res: Response) => {
  const usecase = new CreateCategoryUseCase(repo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getAllCategories = async (req: Request, res: Response) => {
  const usecase = new GetAllCategoriesUseCase(repo);
  const result = await usecase.execute();
  res.status(200).json(result);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const usecase = new GetCategoryByIdUseCase(repo);
  const result = await usecase.execute(req.params.id);
  if (!result) res.status(404).json({ message: "Category not found" });
  res.status(200).json(result);
};

export const updateCategory = async (req: Request, res: Response) => {
  const usecase = new UpdateCategoryUseCase(repo);
  const result = await usecase.execute(req.params.id, req.body);
  if (!result) res.status(404).json({ message: "Category not found" });
  res.status(200).json(result);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const usecase = new DeleteCategoryUseCase(repo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};
