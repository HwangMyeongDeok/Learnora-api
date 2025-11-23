import { Schema, model } from "mongoose";
import { ICourse, CourseLevel, CourseStatus } from "./course.interface";
import slugify from "slugify";

const DOCUMENT_NAME = "Course";
const COLLECTION_NAME = "Courses";

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true }, 
    description: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, 
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    
    level: { type: String, enum: Object.values(CourseLevel), required: true },
    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.DRAFT,
      index: true 
    },
    
    price: { type: Number, required: true, default: 0 },
    discountPrice: { type: Number },
    thumbnail: { type: String, required: true },
  
    
    language: { type: String, required: true },
    
    duration: { type: Number, default: 0 }, 
    enrollmentCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    
    tags: [{ type: String }],
    requirements: [{ type: String }],
    outcomes: [{ type: String }],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


courseSchema.index({ title: "text", description: "text", tags: "text" });

courseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + "-" + Date.now();
  }
  next();
});

courseSchema.virtual("sectionsList", {
  ref: "Section",
  localField: "_id",
  foreignField: "course",
  options: { sort: { order: 1 } } 
});

export const CourseModel = model<ICourse>(DOCUMENT_NAME, courseSchema);