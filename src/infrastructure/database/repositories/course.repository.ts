import { Course } from "../models/course.model";
import { ICourseRepository } from "../../../domain/course/course.repository.interface";
import { CourseStatus, ICourse } from "../../../domain/course/course.interface";

export class CourseRepository implements ICourseRepository {
  async create(courseData: Partial<ICourse>): Promise<ICourse> {
    return await Course.create(courseData);
  }

  async findById(id: string): Promise<ICourse | null> {
    return await Course.findById(id).populate("instructor category sections");
  }

  async findBySlug(slug: string): Promise<ICourse | null> {
    return await Course.findOne({ slug }).populate(
      "instructor category sections"
    );
  }

  async findAll(): Promise<ICourse[]> {
    return await Course.find()
      .populate("instructor category")
      .sort({ createdAt: -1 });
  }

  async update(id: string, data: Partial<ICourse>): Promise<ICourse | null> {
    return await Course.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await Course.findByIdAndDelete(id);
  }

  async findAllPaginated(page: number, limit: number): Promise<ICourse[]> {
    const skip = (page - 1) * limit;
    return await Course.find()
      .skip(skip)
      .limit(limit)
      .populate("instructor category");
  }

  async search(filters: {
    keyword?: string;
    category?: string;
    level?: string;
    priceRange?: [number, number];
    status?: string;
  }): Promise<ICourse[]> {
    const query: any = {};

    if (filters.keyword) {
      query.title = { $regex: filters.keyword, $options: "i" };
    }
    if (filters.category) query.category = filters.category;
    if (filters.level) query.level = filters.level;
    if (filters.status) query.status = filters.status;
    if (filters.priceRange) {
      query.price = {
        $gte: filters.priceRange[0],
        $lte: filters.priceRange[1],
      };
    }

    return await Course.find(query).populate("instructor category");
  }

  async findByInstructor(instructorId: string): Promise<ICourse[]> {
    return await Course.find({ instructor: instructorId }).populate("category");
  }

  async updateStatus(
    id: string,
    status: CourseStatus
  ): Promise<ICourse | null> {
    return await Course.findByIdAndUpdate(id, { status }, { new: true });
  }

  async findPopular(limit: number): Promise<ICourse[]> {
    return await Course.find()
      .sort({ enrollCount: -1 })
      .limit(limit)
      .populate("instructor");
  }

  async findRelated(courseId: string): Promise<ICourse[]> {
    const current = await Course.findById(courseId);
    if (!current) return [];
    return await Course.find({
      _id: { $ne: courseId },
      category: current.category,
    }).limit(5);
  }
}
