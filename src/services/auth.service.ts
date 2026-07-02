//
// auth.service.ts
//
// This file defines the authentication service for the application.
// It includes functions for user registration, login, and logout, which interact with the database and handle authentication logic.
//

import { User } from "../generated/prisma/client";
import { RegisterSchemaType } from "../validation/auth.schema";
import { getUserByEmail, createUser } from "../repositories/user.repo";
import AppError from "../utils/AppError";

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
  const user = await createUser(body);

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
