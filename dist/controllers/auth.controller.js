"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.COOKIE_OPTIONS = void 0;
const auth_validator_1 = require("../validators/auth.validator");
const auth_service_1 = require("../services/auth.service");
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
const register = async (req, res, next) => {
    try {
        const body = auth_validator_1.registerSchema.parse(req.body);
        const { user, token } = await (0, auth_service_1.registerService)(body);
        res.cookie("token", token, exports.COOKIE_OPTIONS);
        res.status(201);
        res.json({
            msg: "User registered successfully",
            user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const body = auth_validator_1.loginSchema.parse(req.body);
        const { user, token } = await (0, auth_service_1.loginService)(body);
        res.cookie("token", token, exports.COOKIE_OPTIONS);
        res.json({
            msg: "Login successful",
            token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                msg: error.message,
            });
        }
        return res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};
exports.login = login;
