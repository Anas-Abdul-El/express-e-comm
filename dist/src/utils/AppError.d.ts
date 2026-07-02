/**
 * A custom error class that extends the built-in Error class. It is used to create operational errors that can be handled gracefully by the application.
 * @class
 * @extends Error
 * @property {number} statusCode - The HTTP status code associated with the error.
 * @property {string} status - A string indicating the type of error ("fail" for client errors, "error" for server errors).
 * @property {boolean} isOperational - A boolean indicating whether the error is operational (true) or a programming error (false).
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code associated with the error.
 */
declare class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export default AppError;
//# sourceMappingURL=AppError.d.ts.map