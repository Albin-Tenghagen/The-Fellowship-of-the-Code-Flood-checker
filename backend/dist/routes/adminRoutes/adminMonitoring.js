console.log(" Monitoring router running....");
import express from "express";
import authHistoricalMonitoringRouter from "./adminHistoricalMonitoring.js";
const authMonitoringRouter = express.Router();
authMonitoringRouter.use(
  "/historicalMonitoring",
  authHistoricalMonitoringRouter
);
authMonitoringRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the adminMonitoring Endpoint." });
});
export default authMonitoringRouter;
// /admin/adminAuth
// /admin/adminAuth/authenticated/monitoring
// /admin/adminAuth/authenticated/monitoring/historicalMonitoring
// admin/adminAuth/authenticated/infrastructureIssues
// admin/adminAuth/authenticated/issueUpkeep
