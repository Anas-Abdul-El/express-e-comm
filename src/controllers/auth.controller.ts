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
  SendVerificationCodeSchemaType,
  VerifyVerificationCodeSchemaType,
  SendPasswordResetCodeSchemaType,
  VerifyPasswordResetCodeSchemaype,
} from "../validation/auth.schema";
import { User } from "../generated/prisma/client";
import { generateToken, verifyToken } from "../utils/token";
import AppError from "../utils/AppError";
import { saveSessionToken } from "../repositories/user.repo";
import { verifyEmail } from "../services/auth.service";

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

  await saveSessionToken(
    user.id,
    refreshToken,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

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

/**
 * sentVerificationCode handles verifing the acc.
 * It send a verfication token by email provided by the body.
 * @param req - The Express request object containing the email in body.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
const sentVerificationCode = async (
  req: Request<{}, {}, SendVerificationCodeSchemaType["body"], {}>,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  const verifyToken = generateToken({ email }, "verify");
  await authService.sendVerificationEmail(email, verifyToken);

  res.status(200).send({ msg: `code send to email: ${email}` });
};

/**
 * verifyVerificationCode handles verifing the acc.
 * It verifies the verify token provided by the email sent by the previos route
 * @param req - The Express request object containing the verify token in body.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
const verifyVerificationCode = async (
  req: Request<{}, {}, VerifyVerificationCodeSchemaType["body"], {}>,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.body;

  await verifyEmail(token);

  res.status(200).send({ msg: "account has been verified" });
};

const sentPasswordResetCode = async (
  req: Request<{}, {}, SendPasswordResetCodeSchemaType["body"], {}>,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const token = generateToken({ email }, "verify");

  await authService.sendPasswordResetCode(email, token);

  res.status(200).send({ msg: `code send to email: ${email}` });
};

const verifyPasswordResetCode = async (
  req: Request<{}, {}, VerifyPasswordResetCodeSchemaype["body"], {}>,
  res: Response,
  next: NextFunction,
) => {
  const { token, oldPassword, newPassword } = req.body;

  await authService.verifyPasswordResetCode(newPassword, oldPassword, token);

  res.status(200).send({ msg: "password has been reset" });
};

const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.cookies.refreshToken;
  const newToken = await authService.refreshAccessToken(refreshToken);

  res.json({ accessToken: newToken });
};

export {
  login,
  logout,
  register,
  sentVerificationCode,
  verifyVerificationCode,
  sentPasswordResetCode,
  verifyPasswordResetCode,
  refreshAccessToken,
};
