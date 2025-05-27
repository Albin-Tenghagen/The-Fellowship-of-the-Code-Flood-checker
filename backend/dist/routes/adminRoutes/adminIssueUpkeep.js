console.log("Issue upkeep router running....");
import express from "express";
const authIssueUpkeepRouter = express.Router();
authIssueUpkeepRouter.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Welcome to the adminIssueUpkeep Endpoint " });
});
export default authIssueUpkeepRouter;
