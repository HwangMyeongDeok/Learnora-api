import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesPaginated,
  getPopularCourses,
  searchCourses,
  getCourseBySlug,
  getCoursesByInstructor,
  updateCourseStatus,
  getRelatedCourses,
} from "./course.controller";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { CreateCourseDto } from "../../application/course/dtos/create-course.dto";
import { UpdateCourseDto } from "../../application/course/dtos/update-course.dto";
import { UpdateCourseStatusDto } from "../../application/course/dtos/update-course-status.dto";
import { SearchCourseDto } from "../../application/course/dtos/search-course.dto";

const router = Router();

router.post("/", isAuthenticated, validateMiddleware(CreateCourseDto), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", isAuthenticated, validateMiddleware(UpdateCourseDto), updateCourse);
router.delete("/:id", isAuthenticated, deleteCourse);

router.get("/paginated", getCoursesPaginated);
router.get("/popular", getPopularCourses);
router.get("/slug/:slug", getCourseBySlug);
router.get("/instructor/:instructorId", getCoursesByInstructor);
router.get("/:id/related", getRelatedCourses);

router.get("/search", validateMiddleware(SearchCourseDto, "query"), searchCourses);
router.put("/:id/status", isAuthenticated, validateMiddleware(UpdateCourseStatusDto), updateCourseStatus);

export default router;
