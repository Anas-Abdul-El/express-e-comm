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
/**
 * loginSchema defines the validation schema for user login requests.
 * It ensures that the request body contains a valid email and password.
 * - email: must be a valid email address.
 * - password: must be a string with a minimum length of 6 characters.
 */
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * LoginSchemaType is a TypeScript type that infers the shape of the loginSchema.
 * It can be used to type-check the request body in the login route handler, ensuring that it adheres to the defined schema.
 */
export type LoginSchemaType = z.infer<typeof loginSchema>;
export declare const sendVerificationCodeSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SendVerificationCodeSchemaType = z.infer<typeof sendVerificationCodeSchema>;
export declare const verifyVerificationCodeSchema: z.ZodObject<{
    body: z.ZodObject<{
        token: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type VerifyVerificationCodeSchemaType = z.infer<typeof verifyVerificationCodeSchema>;
export declare const sendPasswordResetCodeSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SendPasswordResetCodeSchemaType = z.infer<typeof sendPasswordResetCodeSchema>;
export declare const verifyPasswordResetCodeSchema: z.ZodObject<{
    body: z.ZodObject<{
        oldPassword: z.ZodString;
        newPassword: z.ZodString;
        token: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type VerifyPasswordResetCodeSchemaype = z.infer<typeof verifyPasswordResetCodeSchema>;
//# sourceMappingURL=auth.schema.d.ts.map