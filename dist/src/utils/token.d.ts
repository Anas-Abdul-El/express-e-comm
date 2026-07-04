import jwt from "jsonwebtoken";
type TokenType = "access" | "refresh" | "verify";
/**
 * generateToken generates a JWT token based on the provided payload and type (access or refresh).
 * @param payload - The payload to include in the token.
 * @param type - The type of token to generate ("access" or "refresh
 */
export declare const generateToken: (payload: object, type: TokenType) => string;
/**
 * verifyToken verifies the provided JWT token based on its type (access or refresh).
 * @param token - The JWT token to verify.
 * @param type - The type of token to verify ("access" or "refresh").
 * @returns The decoded payload if the token is valid; otherwise, throws an AppError.
 */
export declare const verifyToken: (token: string, type: TokenType) => string | jwt.JwtPayload;
export {};
//# sourceMappingURL=token.d.ts.map