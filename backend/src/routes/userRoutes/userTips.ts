console.log("tips router running....");
import express, { Request, Response, Router } from "express";
import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { userTipObject, TipBody } from "../../types/types.ts";
import { validateUserTips } from "../../validators/tipsValidation.ts";
import { timestampCreation } from "../../middleware/timestampCreation.ts";

import db from "../../../Database/db.ts"
const pool = db.pool

const userTipsRouter: Router = express.Router();

interface TipRequest extends Request<{ id: string }, any, TipBody> {}

userTipsRouter.get(
  "/",
  async (_req: TipRequest, res: Response): Promise<void> => {
    
    try {
      const { rows: tips } = await pool.query(`SELECT * FROM "userTips" ORDER BY id ASC`);
      
    
      if (!tips) {
        res.status(404).json({
          message: "The server could not find the tips, please try again later",
        });
        return;
      }

      res.status(200).json({
        message: "Here are the currently available tips:",
        tips: tips,
      });
      return;
    } catch (error) {
      console.error("Server error");
      res.status(500).json({ message: "SERVER SERVER ERROR" });
      return;
    }
  }
);

userTipsRouter.post(
  "/postTip",
   async (req: TipRequest, res: Response): Promise<void> => {
  const { location, description, username } = req.body;

  if (!location || !description || !username) {
    res.status(400).json({ Error: "All values are required" });
    return;
  }

  const newTip = {
    timestamp: timestampCreation(),
    location,
    description,
    username,
  };

  try {
    const validatedTip = await validateUserTips(newTip);
    const query = `
      INSERT INTO "userTips" (timestamp, location, description, username)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [validatedTip.timestamp, validatedTip.location, validatedTip.description, validatedTip.username];

    const result = await db.pool.query(query, values);
    res.status(201).json({ message: "Tip added", newTip: result.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Validation or DB insert failed", details: error });
  }
});


//PUT
userTipsRouter.put(
  "/putTip/:id",
  async (req: TipRequest, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/tips.json");

    const { location, description, } = req.body;

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const tips = JSON.parse(jsonData);

      const index = tips.findIndex((tip: TipBody) => tip.id === id);
      if (index === -1) {
        res.status(404).json({ message: "Tip not found..." });
        return;
      }

      if (!tips) {
        res.status(404).json({
          message: "The server could not find the tips, please try again later",
        });
        return;
      }
      tips[index].location = location;
      tips[index].description = description;

      try {
        const validatedTip = await validateUserTips(tips[index]);
        console.log("validatedTip : ", validatedTip);
        tips.push(validatedTip);
      } catch (error) {
        console.error("Error: ", error);
        res.status(400).json({
          message: "Validation failed",
          details: error,
        });
        return;
      }

      fs.writeFileSync(filePath, JSON.stringify(tips, null, 2), "utf-8");

      res.status(200).json({ message: "Tip edited!", tips: tips });
      return;
    } catch (error) {
      console.error("Server error!");
      res
        .status(500)
        .json({ message: "There was a major internet breakdown, sorry..." });
      return;
    }
  }
);

//DELETE
userTipsRouter.delete(
  "/deleteTip/:id",
  async (req: TipRequest, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/tips.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const tips = JSON.parse(jsonData);

      const index = tips.findIndex((tip: TipBody) => tip.id === id);
      if (index === -1) {
        res.status(404).json({ message: "Tip not found..." });
        return;
      }

      if (!tips) {
        res.status(404).json({
          message: "The server could not find the tips, please try again later",
        });
        return;
      }

      const lessTips = tips.splice(index, 1);
      console.log(lessTips);

      fs.writeFileSync(filePath, JSON.stringify(tips, null, 2), "utf-8");
      res.status(200).json({ message: "Tip deleted!", lessTips: lessTips });
      return;
    } catch (error) {
      console.error("Server error ");
      res
        .status(500)
        .json({ message: "There was a major internet breakdown, sorry..." });
      return;
    }
  }
);

export default userTipsRouter;
