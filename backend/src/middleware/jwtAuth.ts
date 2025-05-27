import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { JWTRequest } from "../types/types.ts";
function authenticateToken(req: JWTRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!authHeader) {
    res.status(401).json({ error: "JWT-token saknas" });
    return;
  }
  if (!token) {
    res.status(401).json({ error: "Das Token ist nicht vorhanden" });
    return;
  }

  const jwtSecret = process.env.JWTSECRET;
  if (!jwtSecret) {
    return res.status(500).json({ error: "JWT secret not configured" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (typeof decoded === "string") {
      return res.status(403).json({ error: "Invalid token format" });
    }

    // Narrowed type: now TypeScript knows it's a JwtPayload object
    req.user = {
      userName: decoded.userName,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(500).json({ message: "Token generation failed", error: error });
  }
}
export default authenticateToken;
