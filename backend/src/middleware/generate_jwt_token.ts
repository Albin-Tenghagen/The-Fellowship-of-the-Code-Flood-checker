// middleware/generateToken.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


//TODO IMPLEMENTERA JÄMFÖRELSE OPERATIONER MED ADMIN TABLE FÖR ATT GENERERA EN TOKEN. AND THEN AFTER THAT WE PARTY
export function generateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { name } = req.body;
  const role = "admin";

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ message: "JWT_SECRET is not defined" });
    return;
  }

  try {
    const token = jwt.sign({ userName: name, role: role }, jwtSecret, {
      expiresIn: "1h",
    });

    // Attach token to request for later use
    req.body.token = token;
    next();
  } catch (err) {
    res.status(500).json({ message: "Token generation failed" });
    return;
  }
}

export default generateToken;
