import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateMiddleware = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(DtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    req.body = dto;
    next();
  };
};
