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

type User = RegisterSchemaType["body"];
/**
 * createUser creates a new user in the database with the provided user information.
 * @param userInfo - An object containing the user's information, including name, email, password, and role.
 * @returns A Promise that resolves to the newly created user object.
 */
export const createUser = async (userInfo: User) => {
  return await db.user.create({
    data: userInfo,
  });
};
