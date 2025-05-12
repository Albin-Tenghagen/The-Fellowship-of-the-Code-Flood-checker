console.log("admin router running....");
import express from "express";
// Import nested modules
import adminAuthRouter from "./adminAuth.js";
const adminRouter = express.Router();
// Nested modules (without "/user" prefix since it's handled in server.ts)
adminRouter.use("/adminAuth", adminAuthRouter);
adminRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the admin Endpoint." });
});
export default adminRouter;
