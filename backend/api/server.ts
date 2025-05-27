import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import YAML from "yamljs";
import path from "path";
import swaggerUi from "swagger-ui-express";
//module
import userRouter from "../src/routes/userRoutes/user.ts";
import adminRouter from "../src/routes/adminRoutes/adminAuth.ts";
import db from "../Database/db.ts";
const { pool, testConnection } = db;

testConnection();

const app = express();

//-------------------
//Swagger inställning för att att generera en api dokumentation
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "The Fellowship of the Codes Restful API",
      description: "API-dokumentation med swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "local dev server",
      },
    ],
  },
  //stjärna för alla filer i routes.
  apis: ["./dist/routes/adminRoutes/*.js", "./dist/routes/userRoutes/*.js"],
};
const swaggerDocs = YAML.load(path.resolve("./src/swagger/swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//-----------------------------
// Middleware
app.use(cors());
app.use(express.json());

//TODO logging middleware

// Middleware for routing
app.use("/users", userRouter);
app.use("/admins", adminRouter);
// Local server adress
const PORT = process.env.PORT || 5050;

app.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the internet, have a look around" });
  return;
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//! Varcel
// _____________________
// // /api/index.ts
// import { VercelRequest, VercelResponse } from "@vercel/node";
// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// dotenv.config();
// import cors from "cors";
// import swaggerUi from "swagger-ui-express";
// import path from "path";
// import YAML from "yamljs";

// import userRouter from "../src/routes/userRoutes/user";
// import adminRouter from "../src/routes/adminRoutes/adminAuth";
// import db from "../Database/db";
// const { testConnection } = db;

// testConnection();

// const app = express();

// // Swagger
// const swaggerDocs = YAML.load(path.resolve("./src/swagger/swagger.yaml"));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/users", userRouter);
// app.use("/admins", adminRouter);

// // Main route
// app.get("/", (_req: Request, res: Response) => {
//   res.status(200).json({ message: "Welcome to the internet, have a look around" });
// });

// // Export the app as a Vercel-compatible handler
// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   // Use Express to handle the request
//   await app(req as any, res as any);
// }
