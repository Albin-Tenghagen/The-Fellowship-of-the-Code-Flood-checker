console.log("Historical monitoring router running....");
import express, { Request, Response, Router } from "express";
import { readFile } from "fs/promises";
import path from "path";

const authHistoricalMonitoringRouter = express.Router();

//GET to acces historical data
authHistoricalMonitoringRouter.get(
  "/",
  async (_req: Request, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/monitoring.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const monitoredData = JSON.parse(jsonData);

      if (!monitoredData) {
        res.status(404).json({
          message:
            "The server could not find the monitored data, please try again later",
        });
      }

      res.status(200).json({
        message: "This is the monitored Data",
        monitoredData: monitoredData,
      });
      return;
    } catch (error) {
      console.error("Server error");
      res.status(500).json({ message: "SERVER Monitoring ERROR" });
      return;
    }
  }
);

export default authHistoricalMonitoringRouter;
