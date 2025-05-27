console.log("notification router running....");
import express from "express";
const userNotificationsRouter = express.Router();
userNotificationsRouter.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Welcome to the user notifications Endpoint." });
});
export default userNotificationsRouter;
