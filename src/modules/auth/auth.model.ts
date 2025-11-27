import mongoose from "mongoose";
import { IUser } from "./auth.types";

const userSchema = new mongoose.Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema);