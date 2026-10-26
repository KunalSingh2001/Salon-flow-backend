"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.registerService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const AppError_1 = require("../utils/AppError");
const registerService = async (body) => {
    const { busniess_name, owner_name, email, password } = body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const already = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (already) {
        throw new AppError_1.AppError("An account with this email already exists", 409, { email: "This email is already in use" });
    }
    const user = await prisma_1.default.user.create({
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
    const token = await (0, jwt_1.generateToken)(user.id);
    return { user, token };
};
exports.registerService = registerService;
const loginService = async (body) => {
    const { email, password } = body;
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new AppError_1.AppError("User not found", 404, { email: "This email is not in use" });
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new AppError_1.AppError("Invalid credentials", 401, { password: "Invalid credentials" });
    }
    const token = await (0, jwt_1.generateToken)(user.id);
    return { user, token };
};
exports.loginService = loginService;
