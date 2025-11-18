import { ISection, ISectionRepository } from "./section.interface"; // Gộp interface

export class SectionService {
  constructor(private readonly sectionRepo: ISectionRepository) {}

  // =================================================================
  // 1. CREATE SECTION
  // =================================================================
  async createSection(data: Partial<ISection>): Promise<ISection> {
    // Tech Lead Note: Tự động tính toán số thứ tự (Order)
    // Logic: Tìm section cuối cùng của khóa học này, lấy order + 1
    // const lastSection = await this.sectionRepo.findLastOne(data.courseId);
    // const newOrder = lastSection ? lastSection.order + 1 : 1;
    
    return await this.sectionRepo.create({
        ...data,
        // order: newOrder 
    });
  }

  // =================================================================
  // 2. GET BY COURSE (Lấy danh sách chương)
  // =================================================================
  async getSectionsByCourse(courseId: string) {
    // BẮT BUỘC phải sort theo 'order' tăng dần (1, 2, 3...)
    // Nếu không sort, danh sách chương sẽ nhảy lung tung mỗi lần F5
    return await this.sectionRepo.findByCourse(courseId); 
  }

  // =================================================================
  // 3. UPDATE SECTION
  // =================================================================
  async updateSection(id: string, data: Partial<ISection>) {
    return await this.sectionRepo.update(id, data);
  }

  // =================================================================
  // 4. DELETE SECTION
  // =================================================================
  async deleteSection(id: string): Promise<void> {
    // Tech Lead Note: Cẩn thận với Orphan Data (Dữ liệu mồ côi)
    // Trước khi xóa Section, phải kiểm tra xem bên trong nó còn Lesson nào không?
    // Cách 1: Chặn xóa. "Bạn phải xóa hết bài học trước khi xóa chương".
    // Cách 2 (Nguy hiểm): Xóa luôn tất cả Lesson bên trong (Cascade Delete).
    
    await this.sectionRepo.delete(id);
  }

  // =================================================================
  // 5. [FEATURE] RE-ORDER (Sắp xếp lại vị trí - Drag & Drop)
  // =================================================================
  // Đây là tính năng Frontend chắc chắn sẽ đòi
  /*
  async reorderSections(courseId: string, orderedIds: string[]) {
      // orderedIds = ["id_cua_chuong_1", "id_cua_chuong_2", ...]
      // Duyệt mảng và update lại field 'order' cho từng cái
      const bulkOps = orderedIds.map((id, index) => ({
          updateOne: {
              filter: { _id: id },
              update: { order: index + 1 }
          }
      }));
      await this.sectionRepo.bulkWrite(bulkOps);
  }
  */
}