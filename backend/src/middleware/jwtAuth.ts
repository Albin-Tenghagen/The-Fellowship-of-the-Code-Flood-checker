import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../../Database/db.ts";

export interface JWTRequest extends Request {
  user?: {
    userName: string;
    role: string;
  };
}

export async function authenticateToken(
  req: JWTRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ error: "Authorization header missing" });
    return;
  }

  const parts = authHeader.split(" ");
  const token = parts[1];
  if (parts[0] !== "Bearer" || !token) {
    res.status(401).json({ error: "Token missing or bad format" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ error: "JWT_SECRET not configured" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (typeof decoded === "string") {
      res.status(403).json({ error: "Invalid token format" });
      return;
    }

    const payload = decoded as JwtPayload & {
      userName: string;
      role: string;
    };

    const result = await db.pool.query(
      "SELECT 1 FROM admins WHERE name = $1 AND role = $2",
      [payload.userName, payload.role]
    );
    if (result.rowCount === 0) {
      res.status(401).json({ error: "User not authorized" });
      return;
    }

    req.user = {
      userName: payload.userName,
      role: payload.role,
    };

    next();
  } catch (err) {
    console.error("Token verification error:", err);

    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export default authenticateToken;
