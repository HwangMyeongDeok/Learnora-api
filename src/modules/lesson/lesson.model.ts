import { Schema, model } from "mongoose";
import { ILesson, LessonType } from "./lesson.interface";
import slugify from "slugify";

const DOCUMENT_NAME = "Lesson";
const COLLECTION_NAME = "Lessons";

const lessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, index: true },
    description: { type: String },
    type: { 
        type: String, 
        enum: Object.values(LessonType), 
        required: true 
    },
    
    content: { type: String }, 
    videoUrl: { type: String }, 
    duration: { type: Number, default: 0 }, 
    
    section: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    
    isPreview: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);


lessonSchema.index({ section: 1, order: 1 });

lessonSchema.index({ course: 1 });

lessonSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + "-" + Date.now();
  }
  next();
});

export const LessonModel = model<ILesson>(DOCUMENT_NAME, lessonSchema);