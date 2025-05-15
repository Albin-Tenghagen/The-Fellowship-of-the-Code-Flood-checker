console.log("tips router running....");
import express from "express";
import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";
const userTipsRouter = express.Router();
//GET
userTipsRouter.get("/", async (req, res) => {
    const filePath = path.resolve("Database/tips.json");
    try {
        const jsonData = await readFile(filePath, "utf-8");
        const tips = JSON.parse(jsonData);
        console.log(tips);
        if (!tips) {
            return res.status(404).json({
                message: "The server could not find the tips, please try again later",
            });
        }
        return res
            .status(200)
            .json({ message: "Here are the currently available tips:", tips: tips });
    }
    catch (error) {
        console.error("Server error");
        return res.status(500).json({ message: "SERVER SERVER ERROR" });
    }
});
//POST
userTipsRouter.post("/postTip", async (req, res) => {
    const filePath = path.resolve("Database/tips.json");
    const { timestamp, location, description, user } = req.body;
    try {
        const jsonData = await readFile(filePath, "utf-8");
        const tips = JSON.parse(jsonData);
        if (!timestamp || !location || !description || !user) {
            return res.status(400).json({ Error: "All values are required" });
        }
        const newTip = {
            id: tips.length + 1001,
            timestamp,
            location,
            description,
            user,
        };
        console.log(newTip);
        tips.push(newTip);
        fs.writeFileSync(filePath, JSON.stringify(tips, null, 2), "utf-8");
        return res
            .status(201)
            .json({ message: "Tips added", tips: tips, newtip: newTip });
    }
    catch (error) {
        console.error("Server error ");
        return res
            .status(500)
            .json({ message: "There was a major internet breakdown, sorry..." });
    }
});
//PUT
userTipsRouter.put("/putTip/:id", async (req, res) => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/tips.json");
    const { timestamp, location, description, user } = req.body;
    try {
        const jsonData = await readFile(filePath, "utf-8");
        const tips = JSON.parse(jsonData);
        const index = tips.findIndex((tip) => tip.id === id);
        if (index === -1) {
            return res.status(404).json({ message: "Tip not found..." });
        }
        if (!tips) {
            return res.status(404).json({
                message: "The server could not find the tips, please try again later",
            });
        }
        tips[index].timestamp = timestamp;
        tips[index].location = location;
        tips[index].description = description;
        tips[index].user = user;
        fs.writeFileSync(filePath, JSON.stringify(tips, null, 2), "utf-8");
        return res.status(200).json({ message: "Tip edited!", tips: tips });
    }
    catch (error) {
        console.error("Server error!");
        return res
            .status(500)
            .json({ message: "There was a major internet breakdown, sorry..." });
    }
});
//DELETE
userTipsRouter.delete("/deleteTip/:id", async (req, res) => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/tips.json");
    try {
        const jsonData = await readFile(filePath, "utf-8");
        const tips = JSON.parse(jsonData);
        const index = tips.findIndex((tip) => tip.id === id);
        if (index === -1) {
            return res.status(404).json({ message: "Tip not found..." });
        }
        if (!tips) {
            return res.status(404).json({
                message: "The server could not find the tips, please try again later",
            });
        }
        const lessTips = tips.splice(index, 1);
        console.log(lessTips);
        fs.writeFileSync(filePath, JSON.stringify(tips, null, 2), "utf-8");
        return res
            .status(200)
            .json({ message: "Tip deleted!", lessTips: lessTips });
    }
    catch (error) {
        console.error("Server error ");
        return res
            .status(500)
            .json({ message: "There was a major internet breakdown, sorry..." });
    }
});
export default userTipsRouter;
