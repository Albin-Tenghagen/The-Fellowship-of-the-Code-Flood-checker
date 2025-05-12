console.log("adminAuth router running....");
import express, { Request, Response, Router } from "express";
import { readFile } from "fs/promises";
// Import nested modules
import authMonitoringtRouter from "./adminMonitoring.ts";
import authInfrastructureRouter from "./adminInfrastructure.ts";

import authIssueUpkeepRouter from "./adminIssueUpkeep.ts";
import { adminLogin, loginData } from "types/types.ts";
import path from "path";

const adminRouter = express.Router(); // Define adminRouter first!

// Nested modules (without "/user" prefix since it's handled in server.ts)
adminRouter.use("/authenticated/monitoring", authMonitoringtRouter);
adminRouter.use(
  "/authenticated/infrastructureIssues",
  authInfrastructureRouter
);
adminRouter.use("/authenticated/issueUpkeep", authIssueUpkeepRouter);

adminRouter.get("/", (_req, res) => {
  res.status(200).json({
    message:
      "Welcome to the adminAuth Endpoint. Please login to gain acces to the admin portal",
  });
});

//POST for login with email and password?
//TODO Kryptera denna post för att få en funktionell inloggningsfunktion
adminRouter.post(
  "/login",
  async (req: adminLogin, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/admin.json");
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (![name, email, password].every(Boolean)) {
      res.status(400).json({
        message: "All fields (name, email, password) are required.",
      });
      return;
    }
    try {
      const jsonData = await readFile(filePath, "utf-8");
      const loginInfo = JSON.parse(jsonData);

      const specificLogin = loginInfo.find(
        (login: loginData) => login.name === name
      );

      if (
        specificLogin &&
        specificLogin.email === email &&
        specificLogin.password === password
      ) {
        res.status(200).json({
          message: "Login successful, you should receive a session token",
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Server error", error);
      res.status(500).json({ message: "SERVER SERVER ERROR" });
      return;
    }
  }
);
export default adminRouter;
