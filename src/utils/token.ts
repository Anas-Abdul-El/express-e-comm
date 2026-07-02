import jwt from "jsonwebtoken";
import AppError from "./AppError";

/**
 * generateToken generates a JWT token based on the provided payload and type (access or refresh).
 * @param payload - The payload to include in the token.
 * @param type - The type of token to generate ("access" or "refresh
 */
export const generateToken = (payload: object, type: "access" | "refresh") => {
  const secretKey =
    type === "access"
      ? process.env.ACCESS_TOKEN_SECRET!
      : process.env.REFRESH_TOKEN_SECRET!;

  const expiresIn = type === "access" ? "1h" : "7d";
  return jwt.sign(payload, secretKey, { expiresIn });
};

/**
 * generateVerificationToken generates a JWT token for email verification based on the provided payload.
 * @param payload - The payload to include in the verification token.
 * @returns A JWT token for email verification.
 */
export const generateVerificationToken = (payload: object) => {
  return jwt.sign(payload, process.env.VERIFICATION_TOKEN_SECRET!, {
    expiresIn: "1h",
  });
};

/**
 * verifyToken verifies the provided JWT token based on its type (access or refresh).
 * @param token - The JWT token to verify.
 * @param type - The type of token to verify ("access" or "refresh").
 * @returns The decoded payload if the token is valid; otherwise, throws an AppError.
 */
export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secretKey =
    type === "access"
      ? process.env.ACCESS_TOKEN_SECRET!
      : process.env.REFRESH_TOKEN_SECRET!;

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
};
