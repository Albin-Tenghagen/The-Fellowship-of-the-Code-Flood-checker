console.log("Infrastructure router running....");
import express, { Request, Response, Router } from "express";
import { infrastructureRequest, infrastructureBody } from "types/types";
import { validateInfrastructureIssue } from "../../validators/infrastructureValidation.ts";
import { timestampCreation } from "../../middleware/timestampCreation.ts";

import authenticateToken from "../../middleware/jwtAuth.ts";

import db from "../../../Database/db.ts";
const pool = db.pool;

const authInfrastructureRouter = express.Router();

//GET get the current infrastructure issues or warnings

authInfrastructureRouter.get(
  "/",

  async (_req: Request, res: Response): Promise<void> => {
    try {
      const { rows: infrastructureData } = await pool.query(
        `SELECT * FROM infrastructure ORDER BY id ASC`
      );

      if (!infrastructureData) {
        res.status(404).json({
          message:
            "The server could not find the infrastructure data please try again later",
        });
        return;
      }

      res.status(200).json({
        message: "This is the infrastructure data",
        infrastructureData: infrastructureData,
      });
      return;
    } catch (error) {
      console.error("Server error");
      res.status(500).json({ message: "SERVER Infrastructure ERROR" });
      return;
    }
  }
);

//POST for alerting for issues in infrastructure as in översvämmade gator or smth also for userss to enjoy
authInfrastructureRouter.post(
  "/postInfrastructure",
  authenticateToken,
  async (req: infrastructureRequest, res: Response): Promise<void> => {
    const { problem, location } = req.body;

    if (!problem || !location) {
      res.status(400).json({ message: "All values are required" });
      return;
    }

    const newProblem = {
      location,
      problem,
      timestamp: timestampCreation(),
    };

    try {
      await validateInfrastructureIssue(newProblem);

      const query = `
        INSERT INTO infrastructure (location, problem, timestamp)
        VALUES ($1, $2, $3)
        RETURNING *`;
      const values = [
        newProblem.location,
        newProblem.problem,
        newProblem.timestamp,
      ];
      const result = await db.pool.query(query, values);

      res.status(201).json({
        message: "New infrastructure data added.",
        newProblem: result.rows[0],
      });
    } catch (error) {
      console.error("Validation or DB error:", error);
      res.status(400).json({
        message: "Validation or DB insert failed",
        details: error,
      });
    }
  }
);

//PUT
authInfrastructureRouter.put(
  "/putInfrastructure/:id",
  authenticateToken,
  async (req: infrastructureRequest, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { problem, location } = req.body;

    try {
      const { rows } = await db.pool.query(
        `SELECT * FROM infrastructure WHERE id = $1`,
        [id]
      );

      if (rows.length === 0) {
        res.status(404).json({ message: "Problem not found..." });
      }

      const updatedProblem = {
        location: location,
        problem: problem,
        timestamp: rows[0].timestamp,
      };

      const validatedProblem = await validateInfrastructureIssue(
        updatedProblem
      );
      const updatedQuery = `
        UPDATE infrastructure
        SET location = $1, problem = $2, timestamp = $3
        WHERE id = $4
        RETURNING *`;

      const updateValues = [
        validatedProblem.location,
        validatedProblem.problem,
        validatedProblem.timestamp,
        id,
      ];

      const updateResult = await db.pool.query(updatedQuery, updateValues);

      res.status(200).json({
        message: "Problem updated successfully",
        updatedProblem: updateResult.rows[0],
      });
    } catch (error) {
      console.error("Validation or update failed", error);
      res.status(500).json({ message: "Validation or update failed" });
    }
  }
);

//DELETE

authInfrastructureRouter.delete(
  "/deleteInfrastructure/:id",
  authenticateToken,
  async (req: infrastructureRequest, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    if (!id) {
      res
        .status(40)
        .json({ message: "Id needs to be filled in to delete an item" });
      return;
    }
    try {
      const query = `DELETE FROM infrastructure WHERE id = 1$`;
      const result = await pool.query(query, [id]);
      if (result.rowCount === 0) {
        res.status(404).json({ message: "Infrastructure Issue not found." });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Infrastructure Issue deleted successfully." });
        return;
      }
    } catch (error) {
      console.error("Server error", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
);
export default authInfrastructureRouter;
