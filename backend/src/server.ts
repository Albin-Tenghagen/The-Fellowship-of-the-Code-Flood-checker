// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import YAML from "yamljs";
import path from "path";
import swaggerUi from "swagger-ui-express";

// Import routers (TypeScript files)
import userRouter from "./routes/userRoutes/user.ts";
import adminRouter from "./routes/adminRoutes/adminAuth.ts";
import userTipsRouter from "./routes/userRoutes/userTips.ts";

dotenv.config();

const app = express();

// Swagger setup (optional)
const swaggerDocs = YAML.load(path.resolve("./src/swagger/swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use("/users", userRouter);
app.use("/admins", adminRouter);
app.use("/users/tips", userTipsRouter);

// Base route
app.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to the internet, have a look around" });
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
