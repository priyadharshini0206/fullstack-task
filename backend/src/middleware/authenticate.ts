import { Request, Response, NextFunction } from "express";
import { Role } from "../role";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = {
    id: "123",
    role: Role.ADMIN,
  };

  next();
};
