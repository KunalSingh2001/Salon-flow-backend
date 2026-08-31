import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { RegisterBody, LoginBody } from "../validators/auth.validator";
import { generateToken } from "../utils/jwt";

export const registerService = async (
    body: RegisterBody
) => {
    const { busniess_name, owner_name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const already = await prisma.user.findUnique({
        where: { email },
    });
    if (already) {
        throw new Error("User already exists");
    }
    const user = await prisma.user.create({
        data: {
            businessName: busniess_name,
            ownerName: owner_name,
            email,
            password: hashedPassword,
        },
    });
    return user;
};

export const loginService = async (body: LoginBody) => {
    const { email, password } = body;
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = await generateToken(user.id);
    return { user, token };
}