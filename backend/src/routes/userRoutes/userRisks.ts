console.log("userRisks router running....");
import express, { Request, Response, Router } from "express";
import { userRisksInfo } from "types/types";
import { readFile } from "fs/promises";
import path from "path";

const userRisksRouter = express.Router();

// Define routes

//GET for fetching general data for risk assessments and floodwarnings and water levels.

userRisksRouter.get(
  "/",
  async (_req: Request, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/userRisks.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const risks = JSON.parse(jsonData);
      console.log(risks);

      if (!risks) {
        res.status(404).json({
          message:
            "The server could not find the risks, please try again later",
        });
        return;
      }

      res.status(200).json({
        message: "These are the risks.",
        risks: risks,
      });
      return;
    } catch (error) {
      console.error("Server error");
      res.status(500).json({ message: "SERVER SERVER ERROR" });
      return;
    }
  }
);

export default userRisksRouter;
