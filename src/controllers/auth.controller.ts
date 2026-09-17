import { RequestHandler } from "express";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { registerService, loginService } from "../services/auth.service";

export const register: RequestHandler = async (req, res, next) => {
    try {
        const body = registerSchema.parse(req.body);
        const user = await registerService(body);
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
