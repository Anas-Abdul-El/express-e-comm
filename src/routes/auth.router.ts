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
import { loginSchema, registerSchema } from "../validation/auth.schema";
import { authController } from "../controllers";
import catchAsync from "../middleware/catchAsync";

const authRouter: Router = Router();

// register route for registration
authRouter.post(
  "/register",
  validator(registerSchema),
  catchAsync(authController.register),
);

// login route for login
authRouter.post(
  "/login",
  validator(loginSchema),
  catchAsync(authController.login),
);

// logout route for logout
authRouter.post("/logout", catchAsync(authController.logout));

export default authRouter;
