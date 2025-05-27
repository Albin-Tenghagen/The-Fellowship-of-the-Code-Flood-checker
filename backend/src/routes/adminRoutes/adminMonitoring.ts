console.log(" Monitoring router running....");
import express, { Request, Response, Router } from "express";
import { readFile } from "fs/promises";
import path from "path";

import { StationRequest } from "types/types.ts";
import { MonitoringEntry } from "types/types.ts";

import { timestampCreation } from "../../middleware/timestampCreation.ts";
import db from "../../../Database/db.ts";
import { Query } from "pg";
const pool = db.pool;

const authMonitoringRouter = express.Router();

//GET to monitor currnet data (last two weeks)
authMonitoringRouter.get(
  "/",
  async (_req: StationRequest, res: Response): Promise<void> => {
    try {
      const jsonData = await pool.query(`SELECT * FROM monitoring`);
      const result = jsonData.rows;
      if (!result) {
        res.status(404).json({
          message:
            "The server could not find recent data, please try again later",
        });
        return;
      }

      const twoWeeksAgo: number = Date.now() - 14 * 24 * 60 * 60 * 1000;

      let filteredData: MonitoringEntry[] = result.filter(
        (entry: MonitoringEntry) => {
          const entryTime = new Date(entry.timestamp).getTime();
          return entryTime >= twoWeeksAgo;
        }
      );

      filteredData.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      res.status(200).json({
        message: "This is the recent data from the last 2 weeks",
        data: filteredData,
      });
      return;
    } catch (error) {
      console.error("Server error", error);
      res.status(500).json({ message: "SERVER monitoring ERROR" });
    }
  }
);

//GET to acces historical data (all the existing)
authMonitoringRouter.get(
  "/historicalMonitoring",
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const jsonData = await pool.query(`SELECT * FROM monitoring`);
      const monitoredData = jsonData.rows;

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
authMonitoringRouter.post(
  "/postmonitoring",
  async (req: Request, res: Response): Promise<void> => {
    const {
      station_id,
      soil_moisture_percent,
      temperature_c,
      humidity_percent,
      water_level_pressure_cm,
      water_level_ultrasound_cm,
      water_level_average_cm,
    } = req.body;

    // Create new monitoring entry object
    const newEntry: MonitoringEntry = {
      timestamp: timestampCreation(),
      station_id,
      soil_moisture_percent,
      temperature_c,
      humidity_percent,
      water_level_pressure_cm,
      water_level_ultrasound_cm,
      water_level_average_cm,
    };

    // Input validation (FIXED): Now properly checks for missing values
    if (
      !newEntry.timestamp ||
      !newEntry.station_id ||
      !newEntry.soil_moisture_percent ||
      !newEntry.temperature_c ||
      !newEntry.humidity_percent ||
      !newEntry.water_level_pressure_cm ||
      !newEntry.water_level_ultrasound_cm ||
      !newEntry.water_level_average_cm
    ) {
      res.status(400).json({
        error: "One or more required fields are missing. Please try again.",
      });
      return;
    }

    console.log("newEntry: ", newEntry);

    try {
      const query = `
      INSERT INTO monitoring (
        timestamp,
        station_id,
        soil_moisture_percent,
        temperature_c,
        humidity_percent,
        water_level_pressure_cm,
        water_level_ultrasound_cm,
        water_level_average_cm
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
      const values = [
        newEntry.timestamp,
        newEntry.station_id,
        newEntry.soil_moisture_percent,
        newEntry.temperature_c,
        newEntry.humidity_percent,
        newEntry.water_level_pressure_cm,
        newEntry.water_level_ultrasound_cm,
        newEntry.water_level_average_cm,
      ];

      const result = await pool.query(query, values);
      console.log("result from query:", result);
      res.status(201).json({ message: "Monitoring entry added successfully." });
      return;
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Server error while inserting data." });
    }
    return;
  }
);

export default authMonitoringRouter;
