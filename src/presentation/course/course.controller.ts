import { Request, Response } from "express";
import { CourseRepository } from "../../infrastructure/database/repositories/course.repository";
import { CreateCourseUseCase } from "../../application/course/create-course.usecase";
import { GetAllCoursesUseCase } from "../../application/course/get-all-courses.usecase";
import { GetCourseByIdUseCase } from "../../application/course/get-course-by-id.usecase";
import { UpdateCourseUseCase } from "../../application/course/update-course.usecase";
import { DeleteCourseUseCase } from "../../application/course/delete-course.usecase";
import { GetCoursesPaginatedUseCase } from "../../application/course/get-courses-paginated.usecase";
import { GetPopularCoursesUseCase } from "../../application/course/get-popular-courses.usecase";
import { SearchCoursesUseCase } from "../../application/course/search-courses.usecase";
import { GetCourseBySlugUseCase } from "../../application/course/get-course-by-slug.usecase";
import { GetCoursesByInstructorUseCase } from "../../application/course/get-courses-by-instructor.usecase";
import { UpdateCourseStatusUseCase } from "../../application/course/update-course-status.usecase";
import { GetRelatedCoursesUseCase } from "../../application/course/get-related-courses.usecase";

const courseRepo = new CourseRepository();

export const createCourse = async (req: Request, res: Response) => {
  const useCase = new CreateCourseUseCase(courseRepo);
  const course = await useCase.execute(req.body);
  res.status(201).json(course);
};

export const getAllCourses = async (req: Request, res: Response) => {
  const useCase = new GetAllCoursesUseCase(courseRepo);
  const courses = await useCase.execute();
  res.status(200).json(courses);
};

export const getCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const useCase = new GetCourseByIdUseCase(courseRepo);
  const course = await useCase.execute(req.params.id);
  if (!course) res.status(404).json({ message: "Course not found" });
  res.status(200).json(course);
};

export const updateCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const useCase = new UpdateCourseUseCase(courseRepo);
  const updated = await useCase.execute(req.params.id, req.body);
  if (!updated) res.status(404).json({ message: "Course not found" });
  res.status(200).json(updated);
};

export const deleteCourse = async (req: Request, res: Response) => {
  const useCase = new DeleteCourseUseCase(courseRepo);
  await useCase.execute(req.params.id);
  res.status(204).send();
};

export const getCoursesPaginated = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const useCase = new GetCoursesPaginatedUseCase(courseRepo);
  const result = await useCase.execute({ page, limit });
  res.status(200).json(result);
};

export const getPopularCourses = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 5;
  const useCase = new GetPopularCoursesUseCase(courseRepo);
  const result = await useCase.execute(limit);
  res.status(200).json(result);
};

export const searchCourses = async (req: Request, res: Response) => {
  const useCase = new SearchCoursesUseCase(courseRepo);
  const result = await useCase.execute(req.query);
  res.status(200).json(result);
};

export const getCourseBySlug = async (req: Request, res: Response) => {
  const useCase = new GetCourseBySlugUseCase(courseRepo);
  const course = await useCase.execute(req.params.slug);
  if (!course) res.status(404).json({ message: "Not found" });
  res.status(200).json(course);
};

export const getCoursesByInstructor = async (req: Request, res: Response) => {
  const useCase = new GetCoursesByInstructorUseCase(courseRepo);
  const courses = await useCase.execute(req.params.instructorId);
  res.status(200).json(courses);
};

export const updateCourseStatus = async (req: Request, res: Response) => {
  const useCase = new UpdateCourseStatusUseCase(courseRepo);
  const updated = await useCase.execute(req.params.id, req.body.status);
  if (!updated) res.status(404).json({ message: "Course not found" });
  res.status(200).json(updated);
};

export const getRelatedCourses = async (req: Request, res: Response) => {
  const useCase = new GetRelatedCoursesUseCase(courseRepo);
  const result = await useCase.execute(req.params.id);
  res.status(200).json(result);
};