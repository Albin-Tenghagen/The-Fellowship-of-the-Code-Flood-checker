console.log("Issue upkeep router running....");
import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { user_observation, users_observation_info } from "types/types";
import { validateIssueUpkeep } from "../../validators/issueUpkeepValidation.ts";
import { timestampCreation } from "../../middleware/timestampCreation.ts";

const authIssueUpkeepRouter = express.Router();

authIssueUpkeepRouter.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the adminIssueUpkeep Endpoint " });
});
// * potential additional endpoints
// //GET for seeing the current issues or potenial issues based on the monitoring of the water

// //POST the current status of the potential issues

//POST Creating status or warnings for the public eye to see
authIssueUpkeepRouter.post(
  "/publicWarning",
  async (req: Request, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/userSafety.json");

    const new_user_observation = {
      location: req.body.location,
      description: req.body.description,
      proactiveActions: req.body.proactiveActions,
      warning: req.body.warning,
      waterlevel: req.body.waterlevel,
      riskAssesment: req.body.riskAssesment
    };

    if (typeof req.body.proactiveActions !== "boolean") {
      res.status(400).send({ error: "ProactiveActions must be a boolean" });
      return;
    }

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const issues = JSON.parse(jsonData);

      const publicIssue: user_observation = {
        id: issues.length + 1001,
        timestamp: timestampCreation(),
        ...new_user_observation,
      };

      try {
        const validatedIssueUpkeep = await validateIssueUpkeep(publicIssue);
        issues.push(validatedIssueUpkeep);
      } catch (error) {
        console.error("Error:", error);
        res.status(400).json({
          message: "Validation failed",
          details: error,
        });
      }

      await writeFile(filePath, JSON.stringify(issues, null, 2));

      res.status(201).json({ message: "New user observation issue added successfully" });
    } catch (error) {
      console.error("Error reading or writing the file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//PUT Modifying current issue
authIssueUpkeepRouter.put(
  "/publicWarning/:id",
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/userSafety.json");
    const { location, description, proactiveActions } = req.body;

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const issues: user_observation[] = JSON.parse(jsonData);

      const index = issues.findIndex((issue) => issue.id === id);
      if (index == -1) {
        res.status(404).json({ message: "issue not found " });
        return;
      }

      issues[index].location = location;
      issues[index].description = description;
      issues[index].proactiveActions = proactiveActions;

      await writeFile(filePath, JSON.stringify(issues, null, 2), "utf-8");
      res.status(200).json({ message: "issue updated!", issues: issues });
      return;
    } catch (error) {
      console.error("server error", error);
      res
        .status(500)
        .json({ message: "There was a major internet breakdown, sorry..." });
      return;
    }
  }
);
//DELETE for deleting irrelevant issues
authIssueUpkeepRouter.delete(
  "/publicWarning/:id",
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/userSafety.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const issues: user_observation[] = JSON.parse(jsonData);

      const index = issues.findIndex((issue) => issue.id === id);
      if (index === -1) {
        res.status(404).json({ message: "Issue not found..." });
        return;
      }
      if (!issues) {
        res.status(404).json({
          message:
            "The server could not find the issues, please try again later",
        });
        return;
      }
      const lessIssues = issues.splice(index, 1);
      console.log(lessIssues);
      await writeFile(filePath, JSON.stringify(issues, null, 2), "utf-8");
      res
        .status(200)
        .json({ message: "Issue deleted!", lessIssues: lessIssues });
      return;
    } catch (error) {
      console.error("server error", error);
      res
        .status(500)
        .json({ message: "There was a major internet breakdown, sorry..." });
      return;
    }
  }
);

export default authIssueUpkeepRouter;
