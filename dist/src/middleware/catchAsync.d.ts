import { Request, Response, NextFunction } from "express";
/**
 * catchAsync is a higher-order function that wraps asynchronous route handlers in Express.
 * It catches any errors thrown in the asynchronous function and passes them to the next middleware for error handling.
 * This helps to avoid repetitive try-catch blocks in each route handler.
 * @param fn - The asynchronous function (route handler) to be wrapped.
 * @returns A new function that handles the request, response, and next middleware.
 */
declare const catchAsync: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map