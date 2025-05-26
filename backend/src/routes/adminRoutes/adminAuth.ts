console.log("adminAuth router running....");
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import db from "../../../Database/db.ts";
const pool = db.pool;
import generateToken from "../../middleware/generate_jwt_token.ts";

dotenv.config();

// Import nested modules
import authMonitoringtRouter from "./adminMonitoring.ts";
import authInfrastructureRouter from "./adminInfrastructure.ts";
import maintenanceRouter from "./adminMaintenance.ts";
import authIssueUpkeepRouter from "./adminIssueUpkeep.ts";
import { adminLogin } from "types/types.ts";

const adminRouter = express.Router();

adminRouter.use("/authenticated/monitoring", authMonitoringtRouter);
adminRouter.use(
  "/authenticated/infrastructureIssues",
  authInfrastructureRouter
);
adminRouter.use("/authenticated/issueUpkeep", authIssueUpkeepRouter);
adminRouter.use("/authenticated", maintenanceRouter);

adminRouter.get("/", (_req, res) => {
  res.status(200).json({
    message:
      "Welcome to the adminAuth Endpoint. Please login to gain acces to the admin portal",
  });
});

//POST for registering a new admin
adminRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, access_key } = req.body;
    let name = req.body.name;
    name = name.toLocaleLowerCase();
    if (access_key != process.env.REGISTER_KEY) {
      res.status(400).json({ message: "Register key is invalid" });
      return;
    }
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res
        .status(400)
        .json({ error: "Name is required and must be a non-empty string." });
      return;
    }

    const emailLowerCase = email.trim().toLowerCase();
    const existing = await db.pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [emailLowerCase]
    );

    if ((existing.rowCount ?? 0) > 0) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      res.status(400).json({
        error: "Password is required and must be at least 6 characters long.",
      });
      return;
    }

    try {
      const emailLowerCase = email.trim().toLocaleLowerCase();
      const check_if_email_exists = await db.pool.query(
        "SELECT * FROM admins WHERE email = $1",
        [emailLowerCase]
      );

      if ((check_if_email_exists.rowCount ?? 0) > 0) {
        res.status(409).json({ error: "Email already registered" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const role = "admin";

      await db.pool.query(
        "INSERT INTO admins (name, email, password, role) VALUES ($1, $2, $3, $4)",
        [name, emailLowerCase, hashedPassword, role]
      );

      next();
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  },
  generateToken,
  (req: Request, res: Response) => {
    res.status(201).json({
      message: "Admin registered and logged in",
      token: res.locals.token,
    });
    return;
  }
);

//POST for login with email and password?
adminRouter.post(
  "/login",
  async (req: adminLogin, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password } = req.body;
    let lowercasename = name.toLocaleLowerCase();
    let lowercaseemail = email.toLocaleLowerCase();

    if (![lowercasename, lowercaseemail, password].every(Boolean)) {
      res.status(400).json({
        message: "All fields (name, email, password) are required.",
      });
      return;
    }

    try {
      const result = await pool.query(
        "SELECT * FROM admins WHERE name = $1 AND email = $2",
        [lowercasename, lowercaseemail]
      );

      const admin = result.rows[0];

      if (!admin) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const passwordValid_check = await bcrypt.compare(
        password,
        admin.password
      );

      if (!passwordValid_check) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      res.locals.user = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      };

      next(); // Continue to generateToken
    } catch (error) {
      console.error("Login DB error:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  },
  generateToken,
  (req: adminLogin, res: Response) => {
    res.status(200).json({
      message: "Login successful, you should receive a session token",
      token: res.locals.token,
    });
  }
);

export default adminRouter;
