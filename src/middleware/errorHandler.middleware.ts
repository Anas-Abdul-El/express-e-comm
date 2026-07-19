//
// errorHandler.middleware.ts
//
// This file defines the global error handling middleware for the application.
// It handles various types of errors including Zod validation errors, operational AppErrors, and unexpected errors.
//

import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { ZodError } from "zod";

/**
 * errorHandler is a global error handling middleware for Express.
 * It catches and handles different types of errors: Zod validation errors, operational AppErrors, and unexpected server errors.
 * @param err - The error object thrown by the application.
 * @param req - The Express request object.
 * @param res - The Express response object used to send the error response.
 * @param next - The next middleware function (not used in error handlers).
 * @returns A response with the appropriate status code and error message.
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
