import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { ZodError } from "zod";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const message = err.issues.map((e) => e.message).join(",");
    err = new AppError(400, message);
  }

  if (err instanceof AppError) {
    const { status, statusCode, message } = err;
    return res.status(statusCode).json({
      status,
      message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server Error",
  });
};

export default errorHandler;
