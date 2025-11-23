import { CertificateModel } from "./certificate.model";
import { ICertificate, ICertificateRepository } from "./certificate.interface";

export class CertificateRepository implements ICertificateRepository {
  
  async create(data: any): Promise<ICertificate> {
    return await CertificateModel.create(data);
  }

  async findByUser(userId: string): Promise<ICertificate[]> {
    return await CertificateModel.find({ user: userId })
      .populate("course", "title thumbnail")
      .sort({ issuedAt: -1 })
      .lean<ICertificate[]>();
  }

  async findById(id: string): Promise<ICertificate | null> {
    return await CertificateModel.findById(id)
        .populate("user", "name")
        .populate("course", "title")
        .lean<ICertificate>();
  }

  async findByUserAndCourse(userId: string, courseId: string): Promise<ICertificate | null> {
    return await CertificateModel.findOne({ user: userId, course: courseId }).lean<ICertificate>();
  }
}