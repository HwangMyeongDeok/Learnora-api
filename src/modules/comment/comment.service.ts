import { IComment, ICommentRepository } from "./comment.interface"; // Nhớ gộp interface và repo interface vào 1 file hoặc để cùng folder
// import { CreateCommentDto } from "./dtos/create-comment.dto";

export class CommentService {
  constructor(private readonly commentRepo: ICommentRepository) {}

  // =================================================================
  // 1. CREATE COMMENT (Comment gốc)
  // =================================================================
  async createComment(data: Partial<IComment>) {
    return await this.commentRepo.create(data);
  }

  // =================================================================
  // 2. REPLY COMMENT (Trả lời bình luận)
  // =================================================================
  async replyComment(parentId: string, replyData: Partial<IComment>) {
    // Bước 1: Tạo comment mới (là câu trả lời)
    const reply = await this.commentRepo.create(replyData);

    // Bước 2: Link comment mới này vào comment cha (parentId)
    // Lưu ý: Cần đảm bảo reply._id tồn tại
    if (reply._id) {
        await this.commentRepo.reply(parentId, reply._id.toString());
    } else {
        // Handle error case logic here if needed
    }

    return reply;
  }

  // =================================================================
  // 3. GET COMMENTS BY LECTURE
  // =================================================================
  async getCommentsByLecture(lectureId: string) {
    // Thường thì ở đây sẽ cần logic phân trang (Pagination) sau này
    return await this.commentRepo.findByLecture(lectureId);
  }

  // =================================================================
  // 4. UPDATE COMMENT
  // =================================================================
  async updateComment(id: string, data: Partial<{ content: string }>) {
    // Thường comment chỉ cho sửa Content, không cho sửa người đăng hay lectureId
    return await this.commentRepo.update(id, data);
  }

  // =================================================================
  // 5. DELETE COMMENT
  // =================================================================
  async deleteComment(commentId: string) {
    // Tech Lead Note: Cần cân nhắc xem xóa comment cha thì các comment con (reply) 
    // có bị xóa theo không? Hay chỉ ẩn đi? (Soft Delete)
    await this.commentRepo.delete(commentId);
    return { message: "Comment deleted successfully" };
  }
}