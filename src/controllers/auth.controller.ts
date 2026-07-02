//
// auth controller.ts
//
// This file defines the controller functions for handling authentication-related operations in the application.
// It includes functions for user login, registration, and logout, which interact with the authentication service.

import { NextFunction, Request, Response } from "express";
import { authService } from "../services";
import type {
  RegisterSchemaType,
  LoginSchemaType,
} from "../validation/auth.schema";
import { User } from "../generated/prisma/client";
import { generateToken, verifyToken } from "../utils/token";
import AppError from "../utils/AppError";

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
  const user = await authService.registerUser(req);
  res.status(201).send(user);
};

/**
 * login handles the user login process.
 * It receives the login data from the request body, calls the authentication service to authenticate the user,
 * generates access and refresh tokens, and sends the appropriate response back to the client.
 * @param req - The Express request object containing the login data.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
const login = async (
  req: Request<{}, {}, LoginSchemaType["body"], {}>,
  res: Response,
  next: NextFunction,
) => {
  const user = await authService.loginUser(req);

  const accessToken = generateToken(
    { userId: user.id, role: user.role },
    "access",
  );
  const refreshToken = generateToken({ userId: user.id }, "refresh");

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).send({ accessToken });
};

/**
 * logout handles the user logout process.
 * It verifies the refresh token from the request cookies, calls the authentication service to delete the user's session,
 * clears the refresh token cookie, and sends the appropriate response back to the client.
 * @param req - The Express request object containing the refresh token in cookies.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
const logout = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = verifyToken(req.cookies.refreshToken, "refresh") as {
    userId: string;
  };

  if (!refreshToken) next(new AppError("Refresh token not found", 400));

  await authService.logout(refreshToken.userId);
  res.clearCookie("refreshToken");
  res.status(200).send({ message: "Logged out successfully" });
};

export { register, login, logout };
