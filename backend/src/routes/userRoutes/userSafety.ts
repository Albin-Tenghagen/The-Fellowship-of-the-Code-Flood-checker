console.log("safety router running....");
import { usersSafetyInfo, userSafetyBody } from "types/types";
import express, { Request, Response, Router } from "express";
import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";
const userSafetyRouter = express.Router();

//GET to get the safety information available
userSafetyRouter.get(
  "/",
  async (req: usersSafetyInfo, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/userSafety.json");

    const sorting = req.query.sorting;

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const usersSafetyInfo = JSON.parse(jsonData);
      const viewedInfo = [...usersSafetyInfo];

      if (!usersSafetyInfo) {
        res.status(404).json({
          message: "There were no safety risks or advice to adhere to",
        });
        return;
      }

      if (sorting === "location") {
        viewedInfo.sort((a: any, b: any) =>
          a.location.localeCompare(b.location)
        );
      }
      if (sorting === "time") {
        viewedInfo.sort((a: any, b: any) =>
          a.timestamp.localeCompare(b.timestamp)
        );
      }
      console.log(sorting);
      res.status(200).json({
        message: `sorted by ${sorting || "default sorting"} shown below: `,
        products: viewedInfo,
      });
      return;
    } catch (error) {
      console.log("Server error!");
      res
        .status(500)
        .json({ message: "there was a major internet breakdown, sorry..." });
    }
    return;
  }
);

export default userSafetyRouter;
