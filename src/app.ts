// src/app.ts
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/database.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Routes (all endpoints prefixed with /api)
app.use("/api", routes);

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
