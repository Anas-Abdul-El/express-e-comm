import { NextFunction, Request, Response } from "express";
import type { RegisterSchemaType, LoginSchemaType, SendVerificationCodeSchemaType, VerifyVerificationCodeSchemaType, SendPasswordResetCodeSchemaType, VerifyPasswordResetCodeSchemaype } from "../validation/auth.schema";
import { User } from "../generated/prisma/client";
/**
 * register handles the user registration process.
 * It receives the registration data from the request body, calls the authentication service to register the user,
 * and sends the appropriate response back to the client.
 * @param req - The Express request object containing the registration data.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
declare const register: (req: Request<{}, {}, RegisterSchemaType["body"], {}>, res: Response<Omit<User, "password">>, next: NextFunction) => Promise<void>;
/**
 * login handles the user login process.
 * It receives the login data from the request body, calls the authentication service to authenticate the user,
 * generates access and refresh tokens, and sends the appropriate response back to the client.
 * @param req - The Express request object containing the login data.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
declare const login: (req: Request<{}, {}, LoginSchemaType["body"], {}>, res: Response, next: NextFunction) => Promise<void>;
/**
 * logout handles the user logout process.
 * It verifies the refresh token from the request cookies, calls the authentication service to delete the user's session,
 * clears the refresh token cookie, and sends the appropriate response back to the client.
 * @param req - The Express request object containing the refresh token in cookies.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
declare const logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * sentVerificationCode handles verifing the acc.
 * It send a verfication token by email provided by the body.
 * @param req - The Express request object containing the email in body.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
declare const sentVerificationCode: (req: Request<{}, {}, SendVerificationCodeSchemaType["body"], {}>, res: Response, next: NextFunction) => Promise<void>;
/**
 * verifyVerificationCode handles verifing the acc.
 * It verifies the verify token provided by the email sent by the previos route
 * @param req - The Express request object containing the verify token in body.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
declare const verifyVerificationCode: (req: Request<{}, {}, VerifyVerificationCodeSchemaType["body"], {}>, res: Response, next: NextFunction) => Promise<void>;
declare const sentPasswordResetCode: (req: Request<{}, {}, SendPasswordResetCodeSchemaType["body"], {}>, res: Response, next: NextFunction) => Promise<void>;
declare const verifyPasswordResetCode: (req: Request<{}, {}, VerifyPasswordResetCodeSchemaype["body"], {}>, res: Response, next: NextFunction) => Promise<void>;
declare const refreshAccessToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { login, logout, register, sentVerificationCode, verifyVerificationCode, sentPasswordResetCode, verifyPasswordResetCode, refreshAccessToken, };
//# sourceMappingURL=auth.controller.d.ts.map