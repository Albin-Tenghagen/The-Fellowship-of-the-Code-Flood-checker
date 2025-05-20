// middleware/generateToken.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../../Database/db.ts"; // Import the database module (pg Pool) to query your Postgres DB

// Extend Express Request type to include a `token` field on `req.body`
interface TokenRequest extends Request {
  body: {
    name: string; // Username passed in from client
    token?: string; // JWT that we will attach for downstream handlers
  };
}

/**
 * Middleware: generateToken
 * ------------------------
 * 1. Reads a `name` from the JSON request body
 * 2. Queries the `admins` table to verify that the user exists and fetch their role
 * 3. Signs a JWT (JSON Web Token) containing { userName, role }
 * 4. Attaches the signed token to `req.body.token` and calls `next()`
 *
 * Purpose:
 * - Protects your login route: only valid admins get a token
 * - Tokens carry user identity & role in a tamper-proof way
 */
export async function generateToken(
  req: TokenRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Extract the `name` parameter from the JSON payload
  const { name } = req.body;

  try {
    // Query the `admins` table: check if name exists, retrieve role
    const result = await db.pool.query(
      "SELECT role FROM admins WHERE name = $1",
      [name]
    );

    // If no rows returned, user is not found or not an admin
    if (result.rowCount === 0) {
      // Respond with 401 Unauthorized
      res.status(401).json({ error: "User is not an admin" });
      return;
    }

    // Destructure the `role` column from the first returned row
    const { role } = result.rows[0];

    // Read the JWT secret key from environment variables
    // This secret is used to cryptographically sign tokens
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      // If the secret is missing, we cannot sign tokens—throw a server error
      res.status(500).json({ error: "JWT_SECRET not defined" });
      return;
    }

    // Sign the JWT payload: { userName, role }
    // - The payload is base64‑encoded and signed with HMAC SHA256
    // - `expiresIn: "1h"` sets the `exp` claim to one hour in the future
    const token = jwt.sign({ userName: name, role }, jwtSecret, {
      expiresIn: "1h",
    });

    // Attach the newly minted token onto req.body for downstream handlers
    // (e.g. your login controller can then send it as JSON to the client)
    req.body.token = token;
    next();
  } catch (err) {
    // Log the error for debugging (DB connection issue, etc.)
    console.error("Error querying admins table:", err);
    // Send a generic 500 response
    res.status(500).json({ error: "Failed to generate token" });
  }
}

export default generateToken;
