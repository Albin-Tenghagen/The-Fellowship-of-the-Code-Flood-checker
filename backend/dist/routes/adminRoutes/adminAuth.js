console.log("adminAuth router running....");
import express from "express";
// Import nested modules
import authMonitoringtRouter from "./adminMonitoring.js";
import authInfrastructureRouter from "./adminInfrastructure.js";
import authIssueUpkeepRouter from "./adminIssueUpkeep.js";
const adminAuthRouter = express.Router(); // Define adminAuthRouter first!
// Nested modules (without "/user" prefix since it's handled in server.ts)
adminAuthRouter.use("/authenticated/monitoring", authMonitoringtRouter);
adminAuthRouter.use(
  "/authenticated/infrastructureIssues",
  authInfrastructureRouter
);
adminAuthRouter.use("/authenticated/issueUpkeep", authIssueUpkeepRouter);
adminAuthRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the adminAuth Endpoint." });
});
export default adminAuthRouter;
