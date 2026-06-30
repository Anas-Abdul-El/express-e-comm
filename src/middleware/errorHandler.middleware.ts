import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { status, statusCode, isOperational, message } = err;
  if (isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });
  } else {
    console.log(message);
  }
};

export default errorHandler;
