import { RequestHandler } from "express";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { registerService, loginService } from "../services/auth.service";
import { CookieOptions } from "express";


export const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};


export const register: RequestHandler = async (req, res, next) => {
    try {
        const body = registerSchema.parse(req.body);
        const { user, token } = await registerService(body);
        res.cookie("token", token, COOKIE_OPTIONS);
        res.status(201);
        res.json({
            msg: "User registered successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};



export const login: RequestHandler = async (req, res) => {
    try {
        const body = loginSchema.parse(req.body);
        const { user, token } = await loginService(body);
        res.cookie("token", token, COOKIE_OPTIONS);
        res.json({
            msg: "Login successful",
            token,
        });
    } catch (error) {
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
