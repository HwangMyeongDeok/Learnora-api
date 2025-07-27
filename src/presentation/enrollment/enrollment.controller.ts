import { Request, Response } from "express";
import { EnrollmentRepository } from "../../infrastructure/database/repositories/enrollment.repository";
import { CreateEnrollmentUseCase } from "../../application/enrollment/create-enrollment.usecase";
import { GetEnrollmentsByStudentUseCase } from "../../application/enrollment/get-enrollments-by-student.usecase";
import { GetEnrollmentsByCourseUseCase } from "../../application/enrollment/get-enrollments-by-course.usecase";
import { UpdateEnrollmentUseCase } from "../../application/enrollment/update-enrollment.usecase";
import { DeleteEnrollmentUseCase } from "../../application/enrollment/delete-enrollment.usecase";

const repo = new EnrollmentRepository();

export const createEnrollment = async (req: Request, res: Response) => {
  const usecase = new CreateEnrollmentUseCase(repo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getEnrollmentsByStudent = async (req: Request, res: Response) => {
  const usecase = new GetEnrollmentsByStudentUseCase(repo);
  const result = await usecase.execute(req.params.studentId);
  res.status(200).json(result);
};

export const getEnrollmentsByCourse = async (req: Request, res: Response) => {
  const usecase = new GetEnrollmentsByCourseUseCase(repo);
  const result = await usecase.execute(req.params.courseId);
  res.status(200).json(result);
};

export const updateEnrollment = async (req: Request, res: Response) => {
  const usecase = new UpdateEnrollmentUseCase(repo);
  const updated = await usecase.execute(req.params.id, req.body);
  if (!updated) res.status(404).json({ message: "Enrollment not found" });
  res.status(200).json(updated);
};

export const deleteEnrollment = async (req: Request, res: Response) => {
  const usecase = new DeleteEnrollmentUseCase(repo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};