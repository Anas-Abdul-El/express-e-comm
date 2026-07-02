import { User } from "../generated/prisma/client";
import { RegisterSchemaType } from "../validation/auth.schema";
/**
 * registerUser handles the logic for registering a new user.
 * It takes the validated registration data as input and performs the necessary operations to create a new user in the database.
 * @param data - The validated registration data of type RegisterSchemaType.
 * @returns A promise that resolves to the created user's information.
 */
export declare const registerUser: (data: RegisterSchemaType) => Promise<Omit<User, "password">>;
//# sourceMappingURL=auth.service.d.ts.map