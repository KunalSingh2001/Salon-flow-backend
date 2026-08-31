"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.registerService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const registerService = async (body) => {
    console.log("registerService called with body:", body);
    const { busniess_name, owner_name, email, password } = body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const already = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (already) {
        throw new Error("User already exists");
    }
    const user = await prisma_1.default.user.create({
        data: {
            businessName: busniess_name,
            ownerName: owner_name,
            email,
            password: hashedPassword,
        },
    });
    return user;
};
exports.registerService = registerService;
const loginService = async (body) => {
    const { email, password } = body;
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = await (0, jwt_1.generateToken)(user.id);
    return { user, token };
};
exports.loginService = loginService;
