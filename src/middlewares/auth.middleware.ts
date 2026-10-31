import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

interface JwtPayload {
    userId: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Read token from cookie (supports both 'token' and 'session_token' or Authorization header)
        const token =
            req.cookies?.token ||
            req.cookies?.session_token ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : undefined);

        if (!token) {
            throw new AppError("Unauthorized - No active session", 401);
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        // 3. Find user
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                businessName: true,
                ownerName: true,
                email: true,
                role: true,
            },
        });

        if (!user) {
            throw new AppError("User not found or session invalid", 401);
        }

        // 4. Attach user to request
        (req as any).user = user;
        next();
    } catch (error) {
        next(new AppError("Invalid or expired session", 401));
    }
};
