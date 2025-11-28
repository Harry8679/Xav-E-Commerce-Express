import { Request, Response, NextFunction } from "express";
import { validate } from "../../core/utils/validate";
import { loginSchema, registerSchema } from "./auth.schema";
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

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validate(loginSchema, req.body);
            const result = await authService.login(data);

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        } catch(err) {}
    }
};

export const authController = new AuthController();