//TODO This file needs to be converted to TypeScript before useTips starts working.
//TODO Maybe all the files need to be altered for any of it to work
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//module
import userRouter from "./routes/userRoutes/user.js";
import adminRouter from "./routes/adminRoutes/admin.js";
dotenv.config();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
//TODO logging middleware
// Middleware for routing
app.use("/user", userRouter);
app.use("/admin", adminRouter);
// Local server adress
const PORT = process.env.PORT || 5050;
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the internet, have a look around" });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
