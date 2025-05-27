console.log("userRisks router running....");
import express from "express";
const userRisksRouter = express.Router();
// Define routes
userRisksRouter.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the userRisks Endpoint." });
});
export default userRisksRouter;
