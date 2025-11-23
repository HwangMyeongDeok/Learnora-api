import { Request, Response, NextFunction } from "express";
import { CourseService } from "./course.service";
import { CREATED, OK } from "../../core/success.response";

export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const courseData = { ...req.body, instructor: req.user.userId };
      const result = await this.courseService.createCourse(courseData);
      
      new CREATED({
        message: "Course created successfully",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.courseService.searchCourses(req.query);
      new OK({
        message: "Get courses success",
        metadata: result.courses,
        options: {
            total: result.total,
            totalPages: result.totalPages,
            page: req.query.page || 1,
            limit: req.query.limit || 10
        }
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getOneBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const result = await this.courseService.getCourseBySlug(slug);
      new OK({
        message: "Get course detail success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.courseService.getCourseById(id);
      new OK({
        message: "Get course detail success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const { id } = req.params;
      const result = await this.courseService.updateCourse(id, req.body);

      new OK({
        message: "Course updated successfully",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const { id } = req.params;
      await this.courseService.deleteCourse(id);

      new OK({
        message: "Course deleted successfully",
        metadata: {},
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getMyCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.courseService.getInstructorCourses(req.user.userId);
      new OK({
        message: "Get my courses success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}