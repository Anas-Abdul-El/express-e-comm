import type { RegisterSchemaType } from "../validation/auth.schema";
/**
 * getUserByEmail retrieves a user from the database based on their email address.
 * @param email - The email address of the user to retrieve.
 * @returns A Promise that resolves to the user object if found, or null if no user exists with the given email.
 */
export declare const getUserByEmail: (email: string) => Promise<{
    name: string;
    email: string;
    password: string;
    role: import("../generated/prisma/enums").Role;
    id: string;
    image: string | null;
    isVerified: boolean;
    isActive: boolean;
    verificationCode: string | null;
    verificationCodeExpireAt: Date | null;
    resetPasswordCode: string | null;
    resetPasswordCodeExpireAt: Date | null;
} | null>;
type RegisteredUser = RegisterSchemaType["body"];
/**
 * createUser creates a new user in the database with the provided user information.
 * @param userInfo - An object containing the user's information, including name, email, password, and role.
 * @returns A Promise that resolves to the newly created user object.
 */
export declare const createUser: (userInfo: RegisteredUser) => Promise<{
    name: string;
    email: string;
    password: string;
    role: import("../generated/prisma/enums").Role;
    id: string;
    image: string | null;
    isVerified: boolean;
    isActive: boolean;
    verificationCode: string | null;
    verificationCodeExpireAt: Date | null;
    resetPasswordCode: string | null;
    resetPasswordCodeExpireAt: Date | null;
}>;
/**
 * deleteToken deletes all session tokens associated with a specific user from the database.
 * @param userId - The ID of the user whose session tokens should be deleted.
 * @returns A Promise that resolves to the result of the delete operation.
 */
export declare const deleteToken: (userId: string) => Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
/**
 * createVerificationCode updates the user's record in the database with a new verification code.
 * The code expires 10 minutes after being created.
 * @param userId - The ID of the user for whom the verification code is being created.
 * @param code - The verification code to be associated with the user.
 * @returns A Promise that resolves to the updated user object with the new verification code.
 */
export declare const createVerificationCode: (userId: string, code: string) => Promise<{
    name: string;
    email: string;
    password: string;
    role: import("../generated/prisma/enums").Role;
    id: string;
    image: string | null;
    isVerified: boolean;
    isActive: boolean;
    verificationCode: string | null;
    verificationCodeExpireAt: Date | null;
    resetPasswordCode: string | null;
    resetPasswordCodeExpireAt: Date | null;
}>;
/**
 * getUserByVerificationToken retrieves a user from the database based on their verification token.
 * @param token - The verification token associated with the user.
 * @returns A Promise that resolves to the user object if found, or null if no user exists with the given token.
 */
export declare const getUserByVerificationToken: (token: string) => Promise<{
    name: string;
    email: string;
    password: string;
    role: import("../generated/prisma/enums").Role;
    id: string;
    image: string | null;
    isVerified: boolean;
    isActive: boolean;
    verificationCode: string | null;
    verificationCodeExpireAt: Date | null;
    resetPasswordCode: string | null;
    resetPasswordCodeExpireAt: Date | null;
} | null>;
/**
 * updateUserVerificationStatus updates the verification status of a user in the database.
 * It sets the isVerified field to true and clears the verification code and its expiration date.
 * @param userId - The ID of the user whose verification status is being updated.
 * @param isVerified - A boolean indicating whether the user is verified (true) or not (false).
 * @returns A Promise that resolves to the updated user object with the new verification status.
 */
export declare const updateUserVerificationStatus: (userId: string, isVerified: boolean) => Promise<{
    name: string;
    email: string;
    password: string;
    role: import("../generated/prisma/enums").Role;
    id: string;
    image: string | null;
    isVerified: boolean;
    isActive: boolean;
    verificationCode: string | null;
    verificationCodeExpireAt: Date | null;
    resetPasswordCode: string | null;
    resetPasswordCodeExpireAt: Date | null;
}>;
export {};
//# sourceMappingURL=user.repo.d.ts.map