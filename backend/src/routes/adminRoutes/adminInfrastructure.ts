console.log("Infrastructure router running....");
import express, { Request, Response, Router } from "express";
import fs from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { infrastructureRequest, infrastructureBody } from "types/types";
import { validateInfrastructureIssue } from "../../validators/infrastructureValidation.ts";
import { timestampCreation } from "../../middleware/timestampCreation.ts";

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
  async (req: infrastructureRequest, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/infrastructure.json");
    const { problem, location } = req.body;

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const problems: infrastructureBody[] = JSON.parse(jsonData);

      const index = problems.findIndex((problem) => problem.id === id);
      if (index == -1) {
        res.status(404).json({ message: "problem not found" });
        return;
      }

      problems[index].location = location;
      problems[index].problem = problem;

      await writeFile(filePath, JSON.stringify(problems, null), "utf-8");

      res.status(200).json({ message: "Problem updated successfully" });
    } catch (error) {
      console.error("server error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//DELETE

authInfrastructureRouter.delete(
  "/deleteInfrastructure/:id",
  async (req: infrastructureRequest, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("/Database/infrastructure.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const problems: infrastructureBody[] = JSON.parse(jsonData);

      const index = problems.findIndex((problem) => problem.id == id);
      if (index === -1) {
        res.status(404).json({ message: "Problem not found..." });
        return;
      }
      if (!problems) {
        res.status(404).json({
          message:
            "The server could not find the problems, please try again later",
        });
        return;
      }

      const lessProblems = problems.splice(index, 1);
      console.log(lessProblems);
      await writeFile(filePath, JSON.stringify(problems, null, 2), "utf-8");
      res
        .status(200)
        .json({ message: "Problem deleted!", lessProblems: lessProblems });
      return;
    } catch (error) {
      console.error("Server error", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
);
export default authInfrastructureRouter;
