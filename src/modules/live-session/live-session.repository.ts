import { LiveSession } from "./live-session..model";
import { ILiveSession } from "./live-session.interface";
import { ILiveSessionRepository } from "../../domain/liveSession/liveSession.repository.interface";

export class LiveSessionRepository implements ILiveSessionRepository {
  async create(data: Partial<ILiveSession>): Promise<ILiveSession> {
    return await LiveSession.create(data);
  }

  async findById(id: string): Promise<ILiveSession | null> {
    return await LiveSession.findById(id).populate("course instructor");
  }

  async findByCourse(courseId: string): Promise<ILiveSession[]> {
    return await LiveSession.find({ course: courseId }).sort({ startTime: 1 });
  }

  async update(id: string, data: Partial<ILiveSession>): Promise<ILiveSession | null> {
    return await LiveSession.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await LiveSession.findByIdAndDelete(id);
  }
}
