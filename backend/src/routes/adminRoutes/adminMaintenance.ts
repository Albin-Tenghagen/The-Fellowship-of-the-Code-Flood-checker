// src/routes/adminRoutes/adminInfrastructure.ts

import express, { Response, Router } from "express";
import db from "../../../Database/db.ts";
import { timestampCreation } from "../../middleware/timestampCreation.ts";
import { JWTRequest } from "../../types/types.ts";

import authenticateToken from "../../middleware/jwtAuth.ts";

const maintenanceRouter = express.Router();

// GET: Get all maintenance records
maintenanceRouter.get(
  "/maintenance",
  authenticateToken,
  async (req: JWTRequest, res: Response) => {
    try {
      const jsonData = await db.pool.query(
        `SELECT * FROM admin_maintenance ORDER BY timestamp DESC`
      );
      res
        .status(200)
        .json({ message: "Admin maintenance data", data: jsonData.rows });
    } catch (error) {
      console.error("Server error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// POST: Create a new maintenance entry
maintenanceRouter.post(
  "/maintenance",
  authenticateToken,
  async (req: JWTRequest, res: Response) => {
    const { location, work_issue, work_duration, work_status, station_id } =
      req.body;

    if (!location || !work_issue || !work_duration || !work_status) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    try {
      const worker_id = 1;
      //   const worker_id = req.body?.userName;
      const timestamp = timestampCreation();

      // Get the station_id from somewhere (maybe req.body.station_id if relevant)
      //   const station_id = req.body.station_id;

      const result = await db.pool.query(
        `INSERT INTO admin_maintenance (worker_id, timestamp, updated_timestamp, location, station_id, work_issue, work_duration, work_status)
         VALUES (
            (SELECT id FROM admins WHERE name = $1),
            $2, $2, $3,
            (SELECT id FROM stations WHERE name = $4),
            $5, $6, $7
        )
         RETURNING *`,
        [
          worker_id,
          timestamp,
          location,
          station_id,
          work_issue,
          work_duration,
          work_status,
        ]
      );

      res.status(201).json({
        message: "Maintenance entry created",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Insert error", error);
      res.status(500).json({ message: "Could not create maintenance entry" });
    }
  }
);

// PUT: Update a maintenance entry
maintenanceRouter.put(
  "/maintenance/:id",
  authenticateToken,
  async (req: JWTRequest, res: Response) => {
    const maintenanceId = parseInt(req.params.id);
    const { location, station_id, work_issue, work_duration, work_status } =
      req.body;

    if (!maintenanceId) {
      res.status(400).json({ message: "Missing ID" });
      return;
    }

    try {
      const updated_timestamp = timestampCreation();

      const result = await db.pool.query(
        `UPDATE admin_maintenance
         SET location = $1,
             station_id = $2,
             work_issue = $3,
             work_duration = $4,
             work_status = $5,
             updated_timestamp = $6
         WHERE id = $7
         RETURNING *`,
        [
          location,
          station_id,
          work_issue,
          work_duration,
          work_status,
          updated_timestamp,
          maintenanceId,
        ]
      );

      if (result.rowCount === 0) {
        res.status(404).json({ message: "Maintenance entry not found" });
        return;
      }

      res.status(200).json({
        message: "Maintenance entry updated",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Update error", error);
      res.status(500).json({ message: "Could not update maintenance entry" });
    }
  }
);

// DELETE: Remove a maintenance entry
maintenanceRouter.delete(
  "/maintenance/:id",
  authenticateToken,
  async (req: JWTRequest, res: Response) => {
    const maintenanceId = parseInt(req.params.id);

    if (!maintenanceId) {
      res.status(400).json({ message: "Missing ID" });
      return;
    }

    try {
      const result = await db.pool.query(
        `DELETE FROM admin_maintenance WHERE id = $1 RETURNING *`,
        [maintenanceId]
      );

      if (result.rowCount === 0) {
        res.status(404).json({ message: "Maintenance entry not found" });
        return;
      }

      res.status(200).json({
        message: "Maintenance entry deleted",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Delete error", error);
      res.status(500).json({ message: "Could not delete maintenance entry" });
    }
  }
);

export default maintenanceRouter;
