import { Request, Response, NextFunction } from "express";
import { validate } from "../../core/utils/validate";
import { registerSchema } from "./auth.schema";
import { authService } from "./auth.service";

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validate(registerSchema, req.body);
            const user = await authService.register(data);
            return res.status(201).json({ user });
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {}
};

export const authController = new AuthController();