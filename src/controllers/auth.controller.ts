//
// auth controller.ts
//
// This file defines the controller functions for handling authentication-related operations in the application.
// It includes functions for user login, registration, and logout, which interact with the authentication service.

import { NextFunction, Request, Response } from "express";
import { authService } from "../services";
import { RegisterSchemaType } from "../validation/auth.schema";
import { User } from "../generated/prisma/client";

/**
 * register handles the user registration process.
 * It receives the registration data from the request body, calls the authentication service to register the user,
 * and sends the appropriate response back to the client.
 * @param req - The Express request object containing the registration data.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
const register = async (
  req: Request<{}, {}, RegisterSchemaType["body"], {}>,
  res: Response<Omit<User, "password">>,
  next: NextFunction,
) => {
  try {
    const user = await authService.registerUser(req);
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Logic for user login
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Logic for user logout
};

export { register, login, logout };
