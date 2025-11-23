import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service";
import { CREATED, OK } from "../../core/success.response";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.categoryService.createCategory(req.body);
      new CREATED({
        message: "Category created",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.categoryService.getAllCategories();
      new OK({
        message: "Get categories success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.categoryService.getCategoryById(id);
      new OK({
        message: "Get category success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.categoryService.updateCategory(id, req.body);
      new OK({
        message: "Category updated",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.categoryService.deleteCategory(id);
      new OK({
        message: "Category deleted",
        metadata: {},
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}