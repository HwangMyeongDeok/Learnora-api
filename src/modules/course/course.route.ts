import { Router } from "express";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { CourseRepository } from "./course.repository";
import { validateMiddleware } from "../../middleware/validation";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateCourseDto } from "./dtos/create-course.dto";
import { UpdateCourseDto } from "./dtos/update-course.dto"; 

const router = Router();

const courseRepo = new CourseRepository();
const courseService = new CourseService(courseRepo);
const courseController = new CourseController(courseService);


router.get("/", courseController.getAll);


router.get("/slug/:slug", courseController.getOneBySlug);

router.get("/:id", courseController.getOneById);



router.get(
    "/instructor/my-courses", 
    isAuthenticated, 
    courseController.getMyCourses
);

router.post(
    "/", 
    isAuthenticated, 
    validateMiddleware(CreateCourseDto), 
    courseController.create
);

router.patch(
    "/:id", 
    isAuthenticated, 
    validateMiddleware(UpdateCourseDto), 
    courseController.update
);

router.delete(
    "/:id", 
    isAuthenticated, 
    courseController.delete
);

export default router;