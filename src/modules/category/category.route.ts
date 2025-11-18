import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { UpdateCategoryDto } from "./dtos/update-category.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateCategoryDto), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", isAuthenticated, validateMiddleware(UpdateCategoryDto),updateCategory);
router.delete("/:id", isAuthenticated, deleteCategory);

export default router;
