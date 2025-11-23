import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { ZodError } from "zod";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    if (err instanceof AppError) {
        return res.status(err.status).json({ error: err.message });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            error: "Validation error",
            issues: err.issues,
        });
    }

    return res.status(500).json({ error: "Internal server error" });
}