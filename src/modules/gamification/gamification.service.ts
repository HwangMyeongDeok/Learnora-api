import { IBadge } from "./gamification.interface"; // Nhớ gộp interface IBadge và IGamificationRepository vào chung file này
import { IGamificationRepository } from "./gamification.interface";

export class GamificationService {
  constructor(private readonly gamificationRepo: IGamificationRepository) {}

  // =================================================================
  // 1. GET PROFILE (Xem level, điểm, huy hiệu của user)
  // =================================================================
  async getGamificationProfile(userId: string) {
    // Nếu user chưa có record gamification nào, có thể tự tạo mới ở đây (Auto init)
    let profile = await this.gamificationRepo.getByUser(userId);
    
    if (!profile) {
        // Tech Lead Note: Logic tự động tạo profile rỗng nếu chưa có
        // profile = await this.gamificationRepo.create({ userId, points: 0, level: 1 });
    }
    
    return profile;
  }

  // =================================================================
  // 2. ADD POINTS (Cộng điểm tích lũy)
  // =================================================================
  async addPoints(userId: string, points: number) {
    // Bước 1: Cộng điểm
    const updatedProfile = await this.gamificationRepo.addPoints(userId, points);

    // Bước 2: [LOGIC NÂNG CAO] Check Level Up
    // Ví dụ: Cứ 1000 điểm là lên 1 cấp
    // const newLevel = Math.floor(updatedProfile.totalPoints / 1000) + 1;
    // if (newLevel > updatedProfile.level) {
    //     await this.gamificationRepo.updateLevel(userId, newLevel);
    //     // Bắn notif chúc mừng lên level
    // }

    return updatedProfile;
  }

  // =================================================================
  // 3. UPDATE POINTS (Set cứng điểm số - Dùng cho Admin sửa lỗi)
  // =================================================================
  async updatePoints(userId: string, points: number) {
    return await this.gamificationRepo.updatePoints(userId, points);
  }

  // =================================================================
  // 4. ADD BADGE (Trao huy hiệu)
  // =================================================================
  async addBadge(userId: string, badge: IBadge) {
    // Tech Lead Note: Kiểm tra xem user đã có huy hiệu này chưa để tránh trùng
    // const profile = await this.gamificationRepo.getByUser(userId);
    // if (profile.badges.some(b => b.code === badge.code)) return;

    return await this.gamificationRepo.addBadge(userId, badge);
  }
}