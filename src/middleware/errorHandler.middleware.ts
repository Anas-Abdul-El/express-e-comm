import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { ZodError } from "zod";

/***
 * A middleware to handle errors
 * @returns A middleware function
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  if (err instanceof ZodError) {
    const message = err.issues.map((e) => e.message).join(",");
    err = new AppError(message, 400);
  }

  if (err instanceof AppError) {
    const { status, statusCode, message } = err;
    return res.status(statusCode).send({
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
