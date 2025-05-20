import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../../Database/db.ts"; // Import DB if you want to re-validate user status

// Extend Express Request to include a `user` object after token verification
export interface JWTRequest extends Request {
  user?: {
    userName: string; // The name decoded from the token
    role: string; // The role decoded from the token
  };
}

/**
 * Middleware: authenticateToken
 * ------------------------------
 * 1. Reads the `Authorization` header (expects "Bearer <token>")
 * 2. Verifies the JWT signature & expiration using your secret
 * 3. (Optionally) Re-checks the admins table to ensure the user still exists
 * 4. Attaches the decoded user data to `req.user` and calls `next()`
 *
 * Purpose:
 * - Protects your routes: only requests with valid, non‑expired tokens proceed
 * - Provides downstream handlers with typed user identity & role
 */
export async function authenticateToken(
  req: JWTRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  // 1) Read the Authorization header
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    // 401 if header missing
    res.status(401).json({ error: "Authorization header missing" });
    return;
  }

  // 2) Extract the token part after "Bearer"
  const parts = authHeader.split(" ");
  const token = parts[1];
  if (parts[0] !== "Bearer" || !token) {
    // 401 if format is wrong or token missing
    res.status(401).json({ error: "Token missing or bad format" });
    return;
  }

  // 3) Load your signing secret (must match the one used to sign tokens)
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    // 500 if mis‑configured
    res.status(500).json({ error: "JWT_SECRET not configured" });
    return;
  }

  try {
    // 4) Verify the token's signature & expiration
    const decoded = jwt.verify(token, jwtSecret);

    // jwt.verify can return string or object; we expect an object payload
    if (typeof decoded === "string") {
      res.status(403).json({ error: "Invalid token format" });
      return;
    }

    // Narrow to our custom payload shape
    const payload = decoded as JwtPayload & {
      userName: string;
      role: string;
    };

    // 5) (Optional) Re-validate user in DB: ensure admin still exists
    const result = await db.pool.query(
      "SELECT 1 FROM admins WHERE name = $1 AND role = $2",
      [payload.userName, payload.role]
    );
    if (result.rowCount === 0) {
      // 401 if user no longer in DB or role changed
      res.status(401).json({ error: "User not authorized" });
      return;
    }

    // 6) Attach user info to req.user for downstream handlers
    req.user = {
      userName: payload.userName,
      role: payload.role,
    };

    // 7) All good—proceed to the next middleware/route handler
    next();
  } catch (err) {
    // Catch errors such as token expired or signature mismatch
    console.error("Token verification error:", err);
    // 401 Unauthorized for invalid/expired tokens
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export default authenticateToken;
