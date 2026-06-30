import zod from "zod";
import { Request, Response, NextFunction } from "express";

const validator =
  (schema: zod.ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { data, error } = schema.safeParse(req.body);

    if (error) next(error);

    req.body = data;
    next();
  };
