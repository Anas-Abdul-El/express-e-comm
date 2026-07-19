//
// validator.middleware.ts
//
// This file defines a validation middleware for the application.
// It uses Zod schemas to validate incoming request data against specified schemas.
//

import zod from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * validator is a middleware function that validates incoming request data against a specified Zod schema.
 * It takes a Zod schema as an argument and returns a middleware function that can be used in Express routes.
 * The middleware function checks if the request data conforms to the schema and either passes control to the next middleware
 * or responds with an error if validation fails.
 *
 * @param schema - A Zod schema object used for validating the request data.
 * @returns An Express middleware function that performs validation on the request data.
 */

type ValidationType = "body" | "query" | "params";

const validator =
  (schema: zod.ZodObject, type: ValidationType) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { data, error } = schema.safeParse(req);

    if (error) next(error);

    if (data === undefined) {
      return res.status(400).send({
        status: "fail",
        message: "Invalid request data",
      });
    }

    if (type == "body") req.body = data["body"];

    next();
  };

export default validator;
