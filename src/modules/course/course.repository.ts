import { CourseModel } from "./course.model";
import { ICourse, ICourseRepository, CourseStatus } from "./course.interface";

export class CourseRepository implements ICourseRepository {
  
  async create(data: any): Promise<ICourse> {
    return await CourseModel.create(data);
  }

  async update(id: string, data: any): Promise<ICourse | null> {
    return await CourseModel.findByIdAndUpdate(id, data, { new: true }).lean<ICourse>();
  }

  async delete(id: string): Promise<void> {
    await CourseModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<ICourse | null> {
    return await CourseModel.findById(id)
      .populate("instructor", "name avatar bio") 
      .populate("category", "name slug")        
      .lean<ICourse>(); 
  }

  async findBySlug(slug: string): Promise<ICourse | null> {
    return await CourseModel.findOne({ slug, status: CourseStatus.PUBLISHED }) 
      .populate("instructor", "name avatar")
      .populate("category", "name")
      .lean<ICourse>();
  }

  async findAll(query: any): Promise<{ courses: ICourse[], total: number, totalPages: number }> {
    const { keyword, category, level, priceMin, priceMax, page = 1, limit = 10, sort = "newest" } = query;
    
    const filter: any = { status: CourseStatus.PUBLISHED };
    if (keyword) {
      filter.$text = { $search: keyword };
    }

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (priceMin || priceMax) {
        filter.price = {};
        if (priceMin) filter.price.$gte = Number(priceMin);
        if (priceMax) filter.price.$lte = Number(priceMax);
    }

    let sortOption: any = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "popular") sortOption = { enrollmentCount: -1 }; 

    const skip = (page - 1) * limit;

    const courses = await CourseModel.find(filter)
      .populate("instructor", "name avatar")
      .populate("category", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .lean<ICourse[]>();

    const total = await CourseModel.countDocuments(filter);

    return { 
        courses, 
        total, 
        totalPages: Math.ceil(total / limit) 
    };
  }

  async findByInstructor(instructorId: string): Promise<ICourse[]> {
    return await CourseModel.find({ instructor: instructorId }).lean<ICourse[]>();
  }

  async findPopular(limit: number): Promise<ICourse[]> {
    return await CourseModel.find({ status: CourseStatus.PUBLISHED })
      .sort({ enrollmentCount: -1 }) 
      .limit(limit)
      .lean<ICourse[]>();
  }

  async findRelated(courseId: string): Promise<ICourse[]> {
    const course = await CourseModel.findById(courseId);
    if (!course) return [];
    
    return await CourseModel.find({
        _id: { $ne: courseId }, 
        category: course.category,
        status: CourseStatus.PUBLISHED
    })
    .limit(5)
    .lean<ICourse[]>();
  }
}