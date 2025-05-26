import express, { Request, Response } from "express";
import { Router } from "express";
import db from "../../../Database/db.ts";
import { users_observation_info } from "types/types.ts";
import userTipsRouter from "../userRoutes/userTips.ts";

const pool = db.pool;
const userRouter: Router = express.Router();

userRouter.use("/tips", userTipsRouter);

// Type of allowed sorting fields
type SortField_type =
  | "location"
  | "timestamp"
  | "riskAssesment"
  | "waterlevel"
  | "id";

const SortFields_whitelist: SortField_type[] = [
  "location",
  "timestamp",
  "riskAssesment",
  "waterlevel",
  "id",
];

userRouter.get(
  "/",
  async (req: users_observation_info, res: Response): Promise<void> => {
    const sortInput = req.query.sorting || "id";

    const validatedSortField: SortField_type = SortFields_whitelist.includes(
      sortInput as SortField_type
    )
      ? (sortInput as SortField_type)
      : "id";

    try {
      const { rows: user_observations } = await pool.query(
        `SELECT * FROM user_observation ORDER BY ${sortInput} ASC`
      );

      if (!user_observations || user_observations.length === 0) {
        res.status(404).json({
          message: "No observations found.",
        });
        return;
      }

      res.status(200).json({
        message: `Observations sorted by ${validatedSortField}`,
        user_observations,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);
export default userRouter;
