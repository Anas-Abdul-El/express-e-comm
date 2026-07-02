import jwt from "jsonwebtoken";
/**
 * generateToken generates a JWT token based on the provided payload and type (access or refresh).
 * @param payload - The payload to include in the token.
 * @param type - The type of token to generate ("access" or "refresh
 */
export declare const generateToken: (payload: object, type: "access" | "refresh") => string;
/**
 * generateVerificationToken generates a JWT token for email verification based on the provided payload.
 * @param payload - The payload to include in the verification token.
 * @returns A JWT token for email verification.
 */
export declare const generateVerificationToken: (payload: object) => string;
/**
 * verifyToken verifies the provided JWT token based on its type (access or refresh).
 * @param token - The JWT token to verify.
 * @param type - The type of token to verify ("access" or "refresh").
 * @returns The decoded payload if the token is valid; otherwise, throws an AppError.
 */
export declare const verifyToken: (token: string, type: "access" | "refresh") => string | jwt.JwtPayload;
//# sourceMappingURL=token.d.ts.map