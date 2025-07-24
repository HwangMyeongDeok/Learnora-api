import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateMiddleware = (DtoClass: any, type: "body" | "query" | "params" = "body") => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const source = req[type];
    const dto = plainToInstance(DtoClass, source);
    const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });

    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors.map((e) => ({
          property: e.property,
          constraints: e.constraints,
        })),
      });
      return;
    }

    req[type] = dto;
    next();
  };
};
