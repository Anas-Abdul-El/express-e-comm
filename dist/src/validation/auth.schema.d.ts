import { z } from "zod";
/**
 * registerSchema defines the validation schema for user registration requests.
 * It ensures that the request body contains a valid username, email, and password.
 * - username: must be a string with a minimum length of 3 characters.
 * - email: must be a valid email address.
 * - password: must be a string with a minimum length of 6 characters.
 * - role: optional, must be either "USER" or "ADMIN", defaults to "USER" if not provided.
 */
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            USER: "USER";
            ADMIN: "ADMIN";
        }>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * RegisterSchemaType is a TypeScript type that infers the shape of the registerSchema.
 * It can be used to type-check the request body in the registration route handler, ensuring that it adheres to the defined schema.
 */
export type RegisterSchemaType = z.infer<typeof registerSchema>;
//# sourceMappingURL=auth.schema.d.ts.map