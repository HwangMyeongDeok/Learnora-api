import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../core/error.response"; 

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  if (!err.status) {
      console.error("🔥 ERROR LOG:", err);
  }

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ErrorResponse(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again`;
    error = new ErrorResponse(message, 401);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again`;
    error = new ErrorResponse(message, 401);
  }

  const statusCode = error.status || 500;
  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};