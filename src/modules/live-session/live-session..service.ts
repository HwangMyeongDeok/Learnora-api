import { ILiveSession, ILiveSessionRepository } from "./live-session.interface"; // Gộp interface

export class LiveSessionService {
  constructor(private readonly liveSessionRepo: ILiveSessionRepository) {}

  // =================================================================
  // 1. CREATE LIVE SESSION
  // =================================================================
  async createLiveSession(data: Partial<ILiveSession>) {
    // Tech Lead Note: Logic tích hợp Zoom/Meet
    /*
    const zoomMeeting = await ZoomService.createMeeting({
        topic: data.title,
        startTime: data.startTime
    });
    data.meetingUrl = zoomMeeting.join_url;
    data.meetingId = zoomMeeting.id;
    */
    
    return await this.liveSessionRepo.create(data);
  }

  // =================================================================
  // 2. GET BY ID (Xem chi tiết buổi live)
  // =================================================================
  async getLiveSessionById(id: string) {
    return await this.liveSessionRepo.findById(id);
  }

  // =================================================================
  // 3. GET BY COURSE (Lịch live của khóa học)
  // =================================================================
  async getLiveSessionsByCourse(courseId: string) {
    // Nên sắp xếp theo thời gian (startTime)
    return await this.liveSessionRepo.findByCourse(courseId);
  }

  // =================================================================
  // 4. UPDATE
  // =================================================================
  async updateLiveSession(id: string, data: Partial<ILiveSession>) {
    return await this.liveSessionRepo.update(id, data);
  }

  // =================================================================
  // 5. DELETE
  // =================================================================
  async deleteLiveSession(id: string) {
    await this.liveSessionRepo.delete(id);
    // Tech Lead Note: Nhớ gọi API Zoom để hủy phòng họp nếu có
  }
}