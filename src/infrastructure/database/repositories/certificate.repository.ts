import { ICertificate } from "../../../domain/certificate/certificate.interface";
import { ICertificateRepository } from "../../../domain/certificate/certificate.repository";
import { Certificate } from "../models/certificate.model";

export class CertificateRepository implements ICertificateRepository {
  async create(data: Partial<ICertificate>): Promise<ICertificate> {
    return await Certificate.create(data);
  }

  async findByUser(userId: string): Promise<ICertificate[]> {
    return await Certificate.find({ user: userId }).populate("course");
  }

  async findByCourse(courseId: string): Promise<ICertificate[]> {
    return await Certificate.find({ course: courseId }).populate("user");
  }

  async delete(id: string): Promise<void> {
    await Certificate.findByIdAndDelete(id);
  }
}