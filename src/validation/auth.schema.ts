//
// auth.schema.ts
//
// This file defines the validation schemas for authentication-related operations in the application.
// It uses the Zod library to create schemas for user registration and login, ensuring that incoming requests meet the required format and constraints.
//

import { z } from "zod";

/**
 * registerSchema defines the validation schema for user registration requests.
 * It ensures that the request body contains a valid username, email, and password.
 * - username: must be a string with a minimum length of 3 characters.
 * - email: must be a valid email address.
 * - password: must be a string with a minimum length of 6 characters.
 * - role: optional, must be either "USER" or "ADMIN", defaults to "USER" if not provided.
 */
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
  }),
});

/**
 * RegisterSchemaType is a TypeScript type that infers the shape of the registerSchema.
 * It can be used to type-check the request body in the registration route handler, ensuring that it adheres to the defined schema.
 */
export type RegisterSchemaType = z.infer<typeof registerSchema>;

/**
 * loginSchema defines the validation schema for user login requests.
 * It ensures that the request body contains a valid email and password.
 * - email: must be a valid email address.
 * - password: must be a string with a minimum length of 6 characters.
 */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

/**
 * LoginSchemaType is a TypeScript type that infers the shape of the loginSchema.
 * It can be used to type-check the request body in the login route handler, ensuring that it adheres to the defined schema.
 */
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const sendVerificationCodeSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
  }),
});

export const verifyVerificationCodeSchema = z.object({
  body: z.object({
    token: z.string(),
  }),
});
