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
type User = RegisterSchemaType["body"];
/**
 * createUser creates a new user in the database with the provided user information.
 * @param userInfo - An object containing the user's information, including name, email, password, and role.
 * @returns A Promise that resolves to the newly created user object.
 */
export declare const createUser: (userInfo: User) => Promise<{
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