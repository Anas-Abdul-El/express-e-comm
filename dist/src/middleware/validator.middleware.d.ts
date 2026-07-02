import zod from "zod";
import { Request, Response, NextFunction } from "express";
/***/
declare const validator: (schema: zod.ZodObject) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default validator;
//# sourceMappingURL=validator.middleware.d.ts.map