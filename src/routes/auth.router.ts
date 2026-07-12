//
// auth.router.ts
//
// This file defines the routes for authentication-related operations in the application.
// It uses the Express Router to handle requests related to user authentication, such as login, registration, and logout.
// Routes are defined for each operation, and the corresponding controller functions are invoked to handle the requests.
// register route: POST /auth/register
// login route: POST /auth/login
// logout route: POST /auth/logout

import { Router } from "express";
import validator from "../middleware/validator.middleware";
import {
  loginSchema,
  registerSchema,
  sendPasswordResetCodeSchema,
  sendVerificationCodeSchema,
  verifyPasswordResetCodeSchema,
  verifyVerificationCodeSchema,
} from "../validation/auth.schema";
import { authController } from "../controllers";
import catchAsync from "../middleware/catchAsync";

const authRouter: Router = Router();

// register route for registration
authRouter.post(
  "/register",
  validator(registerSchema, "body"),
  catchAsync(authController.register),
);

// login route for login
authRouter.post(
  "/login",
  validator(loginSchema, "body"),
  catchAsync(authController.login),
);

// logout route for logout
authRouter.post("/logout", catchAsync(authController.logout));

// refresh router to refresh the access token
authRouter.post("/refresh", catchAsync(authController.refreshAccessToken));

// sendVerifyCode route to send a verify token
authRouter.post(
  "/sendVerificationCode",
  validator(sendVerificationCodeSchema, "body"),
  catchAsync(authController.sentVerificationCode),
);

// verifyVerificationCode route to verify the email send by the sendVerifyCode route
authRouter.post(
  "/verifyVerificationCode",
  validator(verifyVerificationCodeSchema, "body"),
  catchAsync(authController.verifyVerificationCode),
);

// sendPasswordresetCode route to send a reset password token
authRouter.post(
  "/sendPasswordresetCode",
  validator(sendPasswordResetCodeSchema, "body"),
  catchAsync(authController.sentPasswordResetCode),
);

// verifyVerificationCode route to verify the email send by the sendPasswordresetCode route
authRouter.post(
  "/verifyPasswordresetCode",
  validator(verifyPasswordResetCodeSchema, "body"),
  catchAsync(authController.verifyPasswordResetCode),
);

export default authRouter;
