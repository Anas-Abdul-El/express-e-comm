//
// auth.service.ts
//
// This file defines the authentication service for the application.
// It includes functions for user registration, login, and logout, which interact with the database and handle authentication logic.
//

import { User } from "../generated/prisma/client";
import type {
  RegisterSchemaType,
  LoginSchemaType,
} from "../validation/auth.schema";
import {
  getUserByEmail,
  createUser,
  deleteToken,
  createVerificationCode,
  getUserByVerificationToken,
  updateUserVerificationStatus,
} from "../repositories/user.repo";
import AppError from "../utils/AppError";
import { createHash, compareHash } from "../utils/hash";
import transporter from "../lib/nodemailer";

/**
 * registerUser handles the logic for registering a new user.
 * It takes the validated registration data as input and performs the necessary operations to create a new user in the database.
 * @param data - The validated registration data of type RegisterSchemaType.
 * @returns A promise that resolves to the created user's information.
 */
export const registerUser = async (
  data: RegisterSchemaType,
): Promise<Omit<User, "password">> => {
  const { body } = data;
  const isUserExists = await getUserByEmail(body.email);

  console.log(isUserExists);

  if (isUserExists) throw new AppError("User already exists", 400);

  const hashedPassword = await createHash(body.password);

  const user = await createUser({ ...body, password: hashedPassword });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * loginUser handles the logic for logging in an existing user.
 * It takes the validated login data as input, verifies the user's credentials, and returns the user's information if successful.
 * @param data - The validated login data of type LoginSchemaType.
 * @returns A promise that resolves to the logged-in user's information.
 */
export const loginUser = async (
  data: LoginSchemaType,
): Promise<Omit<User, "password">> => {
  const { body } = data;

  const user = await getUserByEmail(body.email);
  if (!user) throw new AppError("Invalid email or password", 401);

  const isPasswordValid = await compareHash(body.password, user.password);
  if (!isPasswordValid) throw new AppError("Invalid email or password", 401);

  const { isVerified, isActive } = user;

  if (!isActive) throw new AppError("User account is inactive", 403);

  if (!isVerified)
    throw new AppError(
      "User account is not verified. Please verify your email before logging in.",
      403,
    );

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * logout handles the logic for logging out a user.
 * It takes the user's ID as input and deletes the associated session tokens from the database.
 * @param userId - The ID of the user to log out.
 * @returns A promise that resolves when the logout operation is complete.
 */
export const logout = async (userId: string) => {
  try {
    return await deleteToken(userId);
  } catch (error) {
    throw new AppError("Failed to logout user", 500);
  }
};

/**
 * sendVerificationEmail sends a verification email to the specified email address with a verification token.
 * It constructs a verification URL using the provided token and sends an email with the verification link.
 * @param email - The email address to send the verification email to.
 * @param token - The verification token to include in the email.
 * @returns A promise that resolves when the email is sent successfully.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await createVerificationCode(email, token);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `<p>Please verify your email by clicking the link below:</p>
           <a href="${verificationUrl}">Verify Email</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new AppError("Failed to send verification email", 500);
  }
};

/**
 * verifyEmail handles the logic for verifying a user's email using a verification token.
 * It retrieves the user associated with the provided token, checks if the token is valid and not expired,
 * and updates the user's verification status accordingly.
 * @param token - The verification token to verify the user's email.
 * @returns A promise that resolves when the email verification process is complete.
 */
export const verifyEmail = async (token: string) => {
  const user = await getUserByVerificationToken(token);
  if (!user) throw new AppError("Invalid or expired verification token", 400);

  const now = new Date();
  if (user.verificationCodeExpireAt! > now) {
    await updateUserVerificationStatus(user.id, false);
    throw new AppError("Verification token has expired", 400);
  }

  await updateUserVerificationStatus(user.id, true);
};
