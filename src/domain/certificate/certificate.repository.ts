import { ICertificate } from "./certificate.interface";

export interface ICertificateRepository {
  create(data: Partial<ICertificate>): Promise<ICertificate>;
  findByUser(userId: string): Promise<ICertificate[]>;
  findByCourse(courseId: string): Promise<ICertificate[]>;
  delete(id: string): Promise<void>;
}