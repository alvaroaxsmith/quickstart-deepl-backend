import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConstants } from "../config/auth";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authorization token required." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConstants.secret) as {
      userId: number;
      username: string;
    };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ error: "Invalid or expired token." });
  }
};
