//
// auth.router.ts
//
// This file defines the routes for authentication-related operations in the application.
// It uses the Express Router to handle requests related to user authentication, such as login, registration, and logout.
//

import { Router } from "express";
import validator from "../middleware/validator.middleware";
import { registerSchema } from "../validation/auth.schema";
import { authController } from "../controllers";

const authRouter: Router = Router();

// register route for registration
authRouter.post(
  "/register",
  validator(registerSchema),
  authController.register,
);

export default authRouter;
