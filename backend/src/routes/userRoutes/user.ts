import express, { Request, Response } from "express";
import { Router } from "express";
import db from "../../../Database/db.ts";
import { users_observation_info } from "types/types.ts";

const pool = db.pool;
const userRouter: Router = express.Router();

// Union of allowed sorting fields
type SortField =
  | "location"
  | "timestamp"
  | "riskAssesment"
  | "waterlevel"
  | "id";

// GET /users/safety – ger tillbaka exempeldata
userRouter.get("/safety", (_req: Request, res: Response): void => {
  const safetyTips = [
    { id: 1, title: "Undvik översvämmade vägar", description: "Gå eller kör inte i vattenflöden." },
    { id: 2, title: "Säkra elen", description: "Stäng av el i översvämmade områden." },
    { id: 3, title: "Förbered hemmet", description: "Använd sandsäckar vid dörrar och ventiler." },
  ];

  res.status(200).json({
    message: "Säkerhetstips för översvämningar",
    products: safetyTips, // Viktigt: matchar frontend som läser `data.products`
  });
});

export default userRouter;
