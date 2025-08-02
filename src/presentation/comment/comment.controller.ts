import { Request, Response } from "express";
import { CommentRepository } from "../../infrastructure/database/repositories/comment.repository";
import { CreateCommentUseCase } from "../../application/comment/create-comment.usecase";
import { GetCommentsByLectureUseCase } from "../../application/comment/get-comments-by-lecture.usecase";
import { DeleteCommentUseCase } from "../../application/comment/delete-comment.usecase";
import { ReplyCommentUseCase } from "../../application/comment/reply-comment.usecase";
import { UpdateCommentUseCase } from "../../application/comment/update-comment.usecase";

const repo = new CommentRepository();

export const createComment = async (req: Request, res: Response) => {
  const usecase = new CreateCommentUseCase(repo);
  const result = await usecase.execute({ ...req.body, user: req.user?.userId });
  res.status(201).json(result);
};

export const getCommentsByLecture = async (req: Request, res: Response) => {
  const usecase = new GetCommentsByLectureUseCase(repo);
  const result = await usecase.execute(req.params.lectureId);
  res.status(200).json(result);
};

export const deleteComment = async (req: Request, res: Response) => {
  const usecase = new DeleteCommentUseCase(repo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};

export const replyComment = async (req: Request, res: Response) => {
  const usecase = new ReplyCommentUseCase(repo);
  const result = await usecase.execute(req.params.id, {
    ...req.body,
    user: req.user?.userId,
    lecture: req.body.lecture,
    parentComment: req.params.id,
  });
  res.status(201).json(result);
};

export const updateComment = async (req: Request, res: Response) => {
  const useCase = new UpdateCommentUseCase(repo);
  const updated = await useCase.execute(req.params.id, req.body);
  if (!updated) res.status(404).json({ message: "Not found" });
  res.status(200).json(updated);
};