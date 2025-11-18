import { Request, Response } from "express";
import { CertificateRepository } from "./certificate.repository";
import { CreateCertificateUseCase } from "./create-certificate.usecase";
import { GetCertificatesByUserUseCase } from "./get-certificates-by-user.usecase";
import { GetCertificatesByCourseUseCase } from "./get-certificates-by-course.usecase";
import { DeleteCertificateUseCase } from "./delete-certificate.usecase";

const repo = new CertificateRepository();

export const createCertificate = async (req: Request, res: Response) => {
  const usecase = new CreateCertificateUseCase(repo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getCertificatesByUser = async (req: Request, res: Response) => {
  const usecase = new GetCertificatesByUserUseCase(repo);
  const result = await usecase.execute(req.params.userId);
  res.status(200).json(result);
};

export const getCertificatesByCourse = async (req: Request, res: Response) => {
  const usecase = new GetCertificatesByCourseUseCase(repo);
  const result = await usecase.execute(req.params.courseId);
  res.status(200).json(result);
};

export const deleteCertificate = async (req: Request, res: Response) => {
  const usecase = new DeleteCertificateUseCase(repo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};
