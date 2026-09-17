import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { RegisterBody, LoginBody } from "../validators/auth.validator";
import { generateToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export const registerService = async (
    body: RegisterBody
) => {
    const { busniess_name, owner_name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const already = await prisma.user.findUnique({
        where: { email },
    });
    if (already) {

        throw new AppError(
            "An account with this email already exists",
            409,
            { email: "This email is already in use" }
        );
    }
    const user = await prisma.user.create({
        data: {
            businessName: busniess_name,
            ownerName: owner_name,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            businessName: true,
            ownerName: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
    const token = await generateToken(user.id);
    return { user, token };
};

export const loginService = async (body: LoginBody) => {
    const { email, password } = body;
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new AppError(
            "User not found",
            404,
            { email: "This email is not in use" }
        );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(
            "Invalid credentials",
            401,
            { password: "Invalid credentials" }
        );
    }
    const token = await generateToken(user.id);
    return { user, token };
}