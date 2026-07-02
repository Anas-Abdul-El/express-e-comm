//
// user.repo.ts
//
// This file defines the repository functions for user-related operations in the application.
// It interacts with the database to perform CRUD operations on user data, such as retrieving users by email or ID.
//

import { db } from "../lib/prisma";
import type { RegisterSchemaType } from "../validation/auth.schema";

/**
 * getUserByEmail retrieves a user from the database based on their email address.
 * @param email - The email address of the user to retrieve.
 * @returns A Promise that resolves to the user object if found, or null if no user exists with the given email.
 */
export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};

type RegisteredUser = RegisterSchemaType["body"];
/**
 * createUser creates a new user in the database with the provided user information.
 * @param userInfo - An object containing the user's information, including name, email, password, and role.
 * @returns A Promise that resolves to the newly created user object.
 */
export const createUser = async (userInfo: RegisteredUser) => {
  return await db.user.create({
    data: userInfo,
  });
};

/**
 * deleteToken deletes all session tokens associated with a specific user from the database.
 * @param userId - The ID of the user whose session tokens should be deleted.
 * @returns A Promise that resolves to the result of the delete operation.
 */
export const deleteToken = async (userId: string) => {
  return await db.session.deleteMany({
    where: {
      userId,
    },
  });
};

/**
 * createVerificationCode updates the user's record in the database with a new verification code.
 * The code expires 10 minutes after being created.
 * @param userId - The ID of the user for whom the verification code is being created.
 * @param code - The verification code to be associated with the user.
 * @returns A Promise that resolves to the updated user object with the new verification code.
 */
export const createVerificationCode = async (userId: string, code: string) => {
  return await db.user.update({
    where: {
      id: userId,
    },
    data: {
      verificationCode: code,
      verificationCodeExpiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000),
    },
  });
};

/**
 * getUserByVerificationToken retrieves a user from the database based on their verification token.
 * @param token - The verification token associated with the user.
 * @returns A Promise that resolves to the user object if found, or null if no user exists with the given token.
 */
export const getUserByVerificationToken = async (token: string) => {
  return await db.user.findFirst({
    where: {
      verificationCode: token,
    },
  });
};

/**
 * updateUserVerificationStatus updates the verification status of a user in the database.
 * It sets the isVerified field to true and clears the verification code and its expiration date.
 * @param userId - The ID of the user whose verification status is being updated.
 * @param isVerified - A boolean indicating whether the user is verified (true) or not (false).
 * @returns A Promise that resolves to the updated user object with the new verification status.
 */
export const updateUserVerificationStatus = async (
  userId: string,
  isVerified: boolean,
) => {
  return await db.user.update({
    where: {
      id: userId,
    },
    data: {
      isVerified,
      verificationCode: null,
      verificationCodeExpiresAt: null,
    },
  });
};
