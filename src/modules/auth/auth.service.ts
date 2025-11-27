import jwt from "jsonwebtoken";
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
        const user = await User.findOne({ email: dto.email });
        if (!user) throw new AppError("Invalid Credentials", 400);

        const passwordValid = await argon2.verify(user.password, dto.password);
        if (!passwordValid) throw new AppError("Invalid Credentials", 400);

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "7d" });

        return {
            user: {
                id: user._id,
                email: user.email,
            },
            accessToken,
            refreshToken,
        };
  }
    }
}

export const authService = new AuthService();