import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
declare const errorHandler: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
export default errorHandler;
//# sourceMappingURL=errorHandler.middleware.d.ts.map