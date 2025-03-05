// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET || "secret", (err, user) => {
      if (err) return res.sendStatus(403);
      (req as any).user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJWT;
