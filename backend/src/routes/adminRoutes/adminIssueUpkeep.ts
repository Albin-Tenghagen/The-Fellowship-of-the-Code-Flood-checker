console.log("Issue upkeep router running....");
import express, { Request, Response } from "express";
import { user_observation } from "types/types";
import { validateIssueUpkeep } from "../../validators/issueUpkeepValidation.ts";
import { timestampCreation } from "../../middleware/timestampCreation.ts";

import authenticateToken from "../../middleware/jwtAuth.ts";
import db from "../../../Database/db.ts";
const pool = db.pool;

const authIssueUpkeepRouter = express.Router();

authIssueUpkeepRouter.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the adminIssueUpkeep Endpoint " });
});
//POST Creating status or warnings for the public eye to see
authIssueUpkeepRouter.post(
  "/publicWarning",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    const new_user_observation: user_observation = {
      location: req.body.location,
      description: req.body.description,
      proactive_actions: req.body.proactiveActions,
      warning: req.body.warning,
      waterlevel: req.body.waterlevel,
      risk_assesment: req.body.riskAssesment,
    };

    if (
      !new_user_observation.location ||
      !new_user_observation.description ||
      !new_user_observation.proactive_actions ||
      !new_user_observation.warning ||
      !new_user_observation.waterlevel ||
      !new_user_observation.risk_assesment
    ) {
      res.status(400).json({
        error: "One or more required fields are missing. Please try again.",
      });
      return;
    }

    try {
      const publicIssue: user_observation = {
        timestamp: timestampCreation(),
        ...new_user_observation,
      };
      const query = `INSERT INTO user_observation (timestamp, location, warning, waterlevel, risk_assesment, description, proactive_actions) VALUES($1, $2, $3, $4, $5, $6, $7)`;
      const values = [
        publicIssue.timestamp,
        publicIssue.location,
        publicIssue.warning,
        publicIssue.waterlevel,
        publicIssue.risk_assesment,
        publicIssue.description,
        publicIssue.proactive_actions,
      ];
      console.log("publicIssue posting:", publicIssue);
      try {
        const validatedIssueUpkeep = await validateIssueUpkeep(publicIssue);
      } catch (error) {
        console.error("Error:", error);
        res.status(400).json({
          message: "Validation failed",
          details: error,
        });
      }

      const result = await pool.query(query, values);

      res
        .status(201)
        .json({ message: "New user observation issue added successfully" });
    } catch (error) {
      console.error("Error reading or writing the file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//PUT Modifying current issue
authIssueUpkeepRouter.put(
  "/publicWarning/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    const updatedIssue: user_observation = {
      location: req.body.location,
      description: req.body.description,
      proactive_actions: req.body.proactiveActions,
      warning: req.body.warning,
      waterlevel: req.body.waterlevel,
      risk_assesment: req.body.riskAssesment,
      timestamp: timestampCreation(), // Optional: update timestamp if needed
    };

    if (
      !updatedIssue.location ||
      !updatedIssue.description ||
      !updatedIssue.proactive_actions ||
      !updatedIssue.warning ||
      !updatedIssue.waterlevel ||
      !updatedIssue.risk_assesment
    ) {
      res.status(400).json({
        error: "One or more required fields are missing. Please try again.",
      });
      return;
    }

    try {
      await validateIssueUpkeep(updatedIssue);

      const query = `
        UPDATE user_observation
        SET location = $1,
            description = $2,
            proactive_actions = $3,
            warning = $4,
            waterlevel = $5,
            risk_assesment = $6,
            timestamp = $7
        WHERE id = $8
      `;

      const values = [
        updatedIssue.location,
        updatedIssue.description,
        updatedIssue.proactive_actions,
        updatedIssue.warning,
        updatedIssue.waterlevel,
        updatedIssue.risk_assesment,
        updatedIssue.timestamp,
        id,
      ];

      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        res.status(404).json({ message: "Issue not found." });
        return;
      } else {
        res.status(200).json({ message: "Issue updated successfully." });
        return;
      }
    } catch (error) {
      console.error("Error updating issue:", error);
      res.status(500).json({ message: "Internal server error." });
      return;
    }
  }
);
//DELETE for deleting irrelevant issues
authIssueUpkeepRouter.delete(
  "/publicWarning/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (!id) {
      res
        .status(40)
        .json({ message: "Id needs to be filled in to delete an item" });
      return;
    }
    try {
      const query = `DELETE FROM user_observation WHERE id = $1`;
      const result = await pool.query(query, [id]);

      if (result.rowCount === 0) {
        res.status(404).json({ message: "Issue not found." });
        return;
      } else {
        res.status(200).json({ message: "Issue deleted successfully." });
        return;
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

export default authIssueUpkeepRouter;
