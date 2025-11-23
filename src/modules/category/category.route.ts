import { Router } from "express";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "./category.repository";

import { validateMiddleware } from "../../middleware/validation";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateCategoryDto } from "./dtos/create-category.dto";

const router = Router();

const categoryRepo = new CategoryRepository();
const categoryService = new CategoryService(categoryRepo);
const categoryController = new CategoryController(categoryService);

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);


router.post(
    "/", 
    isAuthenticated, 
    validateMiddleware(CreateCategoryDto), 
    categoryController.create
);

router.patch(
    "/:id", 
    isAuthenticated, 
    categoryController.update
);

router.delete(
    "/:id", 
    isAuthenticated, 
    categoryController.delete
);

export default router;