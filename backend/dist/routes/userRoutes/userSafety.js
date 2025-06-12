console.log("safety router running....");
import express from "express";
const userSafetyRouter = express.Router();
userSafetyRouter.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the userSafety Endpoint " });
});
export default userSafetyRouter;
