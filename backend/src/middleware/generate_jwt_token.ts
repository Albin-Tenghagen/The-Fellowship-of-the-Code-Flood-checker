import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../../Database/db.ts";
interface TokenRequest extends Request {
  body: {
    name: string;
    token?: string;
  };
}

export async function generateToken(
  req: TokenRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name } = req.body;

  try {
    const lowecasename = name.toLocaleLowerCase();
    const result = await db.pool.query(
      "SELECT role FROM admins WHERE name = $1",
      [lowecasename]
    );

    if (result.rowCount === 0) {
      res.status(401).json({ error: "User is not an admin" });
      return;
    }

    const { role } = result.rows[0];

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: "JWT_SECRET not defined" });
      return;
    }

    const token = jwt.sign({ userName: name, role }, jwtSecret, {
      expiresIn: "1h",
    });

    res.setHeader("Authorization", `Bearer ${token}`);

    res.locals.token = token;
    next();
  } catch (err) {
    console.error("Error querying admins table:", err);

    res.status(500).json({ error: "Failed to generate token" });
    return;
  }
}

export default generateToken;
