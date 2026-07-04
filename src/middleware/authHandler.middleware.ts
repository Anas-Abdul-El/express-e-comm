import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { verifyToken } from "../utils/token";

const authHandler =
  (privacy: "public" | "private") =>
  (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.Authorization as string;
    if (!auth) next(new AppError("login first", 401));

    const token = auth.split(" ")[1];
    if (!token) next(new AppError("token unfound", 400));

    let payload;
    try {
      payload = verifyToken(token!, "access") as {
        role: "user" | "admin";
        userId: string;
      };
    } catch (error) {
      next(new AppError("unAuthorized", 401));
    }

    if (privacy === "public") next();

    const { role, userId } = payload!;
    if (role === "admin") next();

    next(new AppError("forbidden routes", 403));
  };

export default authHandler;
