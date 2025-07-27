import { ILiveSession } from "./liveSession.interface";

export interface ILiveSessionRepository {
  create(data: Partial<ILiveSession>): Promise<ILiveSession>;
  findById(id: string): Promise<ILiveSession | null>;
  findByCourse(courseId: string): Promise<ILiveSession[]>;
  update(id: string, data: Partial<ILiveSession>): Promise<ILiveSession | null>;
  delete(id: string): Promise<void>;
}
