console.log("Historical monitoring router running....");
import express from "express";
const authHistoricalMonitoringRouter = express.Router();
authHistoricalMonitoringRouter.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Welcome to the adminHistoricalMonitoring Endpoint." });
});
export default authHistoricalMonitoringRouter;
