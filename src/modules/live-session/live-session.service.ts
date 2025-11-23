import { ILiveSessionRepository } from "./live-session.interface";
import { NotFoundError } from "../../core/error.response";

export class LiveSessionService {
  constructor(private readonly liveSessionRepo: ILiveSessionRepository) {}

  async createSession(data: any) {
    const sessionData = {
        ...data,
        course: data.courseId
    };
    return await this.liveSessionRepo.create(sessionData);
  }

  async updateSession(id: string, data: any) {
    const updated = await this.liveSessionRepo.update(id, data);
    if (!updated) throw new NotFoundError("Session not found");
    return updated;
  }

  async deleteSession(id: string) {
    await this.liveSessionRepo.delete(id);
  }

  async getSessionsByCourse(courseId: string) {
    return await this.liveSessionRepo.findByCourse(courseId);
  }

  async getUpcomingForInstructor(instructorId: string) {
    return await this.liveSessionRepo.findUpcomingByInstructor(instructorId);
  }
}