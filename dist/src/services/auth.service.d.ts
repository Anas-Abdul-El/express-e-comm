import { User } from "../generated/prisma/client";
import type { RegisterSchemaType, LoginSchemaType } from "../validation/auth.schema";
/**
 * registerUser handles the logic for registering a new user.
 * It takes the validated registration data as input and performs the necessary operations to create a new user in the database.
 * @param data - The validated registration data of type RegisterSchemaType.
 * @returns A promise that resolves to the created user's information.
 */
export declare const registerUser: (data: RegisterSchemaType) => Promise<Omit<User, "password">>;
/**
 * loginUser handles the logic for logging in an existing user.
 * It takes the validated login data as input, verifies the user's credentials, and returns the user's information if successful.
 * @param data - The validated login data of type LoginSchemaType.
 * @returns A promise that resolves to the logged-in user's information.
 */
export declare const loginUser: (data: LoginSchemaType) => Promise<Omit<User, "password">>;
/**
 * logout handles the logic for logging out a user.
 * It takes the user's ID as input and deletes the associated session tokens from the database.
 * @param userId - The ID of the user to log out.
 * @returns A promise that resolves when the logout operation is complete.
 */
export declare const logout: (userId: string) => Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
/**
 * sendVerificationEmail sends a verification email to the specified email address with a verification token.
 * It constructs a verification URL using the provided token and sends an email with the verification link.
 * @param email - The email address to send the verification email to.
 * @param token - The verification token to include in the email.
 * @returns A promise that resolves when the email is sent successfully.
 */
export declare const sendVerificationEmail: (email: string, token: string) => Promise<void>;
/**
 * verifyEmail handles the logic for verifying a user's email using a verification token.
 * It retrieves the user associated with the provided token, checks if the token is valid and not expired,
 * and updates the user's verification status accordingly.
 * @param token - The verification token to verify the user's email.
 * @returns A promise that resolves when the email verification process is complete.
 */
export declare const verifyEmail: (token: string) => Promise<void>;
export declare const sendPasswordResetCode: (email: string, token: string) => Promise<void>;
export declare const verifyPasswordResetCode: (newPassword: string, oldPassword: string, token: string) => Promise<void>;
export declare const refreshAccessToken: (refreshToken: string) => Promise<string>;
//# sourceMappingURL=auth.service.d.ts.map