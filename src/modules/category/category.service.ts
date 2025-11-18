import { ICategoryRepository } from "./category.interface"; // Nhớ copy interface về cùng folder
// import { CreateCategoryDto } from "./dtos/create-category.dto";
// import { UpdateCategoryDto } from "./dtos/update-category.dto";

export class CategoryService {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  // =================================================================
  // 1. CREATE
  // =================================================================
  async createCategory(data: any) { // Nên thay 'any' bằng CreateCategoryDto
    return await this.categoryRepo.create(data);
  }

  // =================================================================
  // 2. GET ALL
  // =================================================================
  async getAllCategories() {
    return await this.categoryRepo.findAll();
  }

  // =================================================================
  // 3. GET BY ID
  // =================================================================
  async getCategoryById(id: string) {
    const category = await this.categoryRepo.findById(id);
    // Tech Lead Note: Nên thêm check null ở đây
    // if (!category) throw new ErrorHandler("Category not found", 404);
    return category;
  }

  // =================================================================
  // 4. UPDATE
  // =================================================================
  async updateCategory(id: string, data: any) { // Nên thay 'any' bằng UpdateCategoryDto
    // Có thể check tồn tại trước khi update
    return await this.categoryRepo.update(id, data);
  }

  // =================================================================
  // 5. DELETE
  // =================================================================
  async deleteCategory(id: string) {
    // Có thể check xem category có đang chứa khóa học nào không trước khi xóa
    await this.categoryRepo.delete(id);
    return { message: "Category deleted successfully" };
  }
}