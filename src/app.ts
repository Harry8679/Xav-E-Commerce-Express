import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import { errorMiddleware } from "./core/errors/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);

// Error
app.use(errorMiddleware);

export default app;