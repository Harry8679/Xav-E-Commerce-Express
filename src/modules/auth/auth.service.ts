import { AppError } from "../../core/errors/AppError";
import { User } from "./auth.model";
import { LoginInput, RegisterInput } from "./auth.schema";
import argon2 from "argon2";

export class AuthService {
    async register(dto: RegisterInput) {
        const existing = await User.findOne({ email: dto.email });
        if (existing) throw new AppError("Email already registred", 400);

        const hashedPassword = await argon2.hash(dto.password);

        const user = await User.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email.toLowerCase(),
            password: hashedPassword
        });

        return { id: user._id, email: user.email };
    }

    async login(dto: LoginInput) {

    }
}

export const authService = new AuthService();