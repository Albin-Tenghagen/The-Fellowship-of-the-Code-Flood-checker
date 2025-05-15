console.log("Infrastructure router running....");
import express from "express";
const authInfrastructureRouter = express.Router();
authInfrastructureRouter.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Welcome to the adminInfrastructure Endpoint " });
});
export default authInfrastructureRouter;
