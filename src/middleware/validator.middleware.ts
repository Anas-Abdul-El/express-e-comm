import zod from "zod";
import { Request, Response, NextFunction } from "express";

/***/
const validator =
  (schema: zod.ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { data, error } = schema.safeParse(req);

    if (error) next(error);

    if (data === undefined) {
      return res.status(400).send({
        status: "fail",
        message: "Invalid request data",
      });
    }

    req.body = data["body"];
    next();
  };

export default validator;
