"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = require("../utils/AppError");
const authenticate = async (req, res, next) => {
    try {
        // 1. Read token from cookie (supports both 'token' and 'session_token' or Authorization header)
        const token = req.cookies?.token ||
            req.cookies?.session_token ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : undefined);
        if (!token) {
            throw new AppError_1.AppError("Unauthorized - No active session", 401);
        }
        // 2. Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // 3. Find user
        const user = await prisma_1.default.user.findUnique({
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
            throw new AppError_1.AppError("User not found or session invalid", 401);
        }
        // 4. Attach user to request
        req.user = user;
        next();
    }
    catch (error) {
        next(new AppError_1.AppError("Invalid or expired session", 401));
    }
};
exports.authenticate = authenticate;
