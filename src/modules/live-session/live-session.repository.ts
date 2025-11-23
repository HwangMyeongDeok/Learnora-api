import { LiveSessionModel } from "./live-session.model";
import { ILiveSession, ILiveSessionRepository, LiveSessionStatus } from "./live-session.interface";

export class LiveSessionRepository implements ILiveSessionRepository {
  
  async create(data: any): Promise<ILiveSession> {
    return await LiveSessionModel.create(data);
  }

  async update(id: string, data: any): Promise<ILiveSession | null> {
    return await LiveSessionModel.findByIdAndUpdate(id, data, { new: true }).lean<ILiveSession>();
  }

  async delete(id: string): Promise<void> {
    await LiveSessionModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<ILiveSession | null> {
    return await LiveSessionModel.findById(id).lean<ILiveSession>();
  }

  async findByCourse(courseId: string): Promise<ILiveSession[]> {
    return await LiveSessionModel.find({ course: courseId })
        .sort({ startTime: 1 }) 
        .lean<ILiveSession[]>();
  }

  async findUpcomingByInstructor(instructorId: string): Promise<ILiveSession[]> {
    return await LiveSessionModel.find({ 
        instructor: instructorId,
        status: LiveSessionStatus.SCHEDULED,
        startTime: { $gte: new Date() }
    })
    .sort({ startTime: 1 })
    .lean<ILiveSession[]>();
  }
}