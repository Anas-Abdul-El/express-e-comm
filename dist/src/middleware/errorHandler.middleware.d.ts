import { Request, Response, NextFunction } from "express";
declare const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default errorHandler;
//# sourceMappingURL=errorHandler.middleware.d.ts.map