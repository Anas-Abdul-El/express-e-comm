import { NextFunction, Request, Response } from "express";
declare const authHandler: (privacy: "public" | "private") => (req: Request, res: Response, next: NextFunction) => void;
export default authHandler;
//# sourceMappingURL=authHandler.middleware.d.ts.map