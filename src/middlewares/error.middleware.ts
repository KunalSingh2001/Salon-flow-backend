import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // 1. Check if it's our custom AppError (like email already exists)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(err.errors && { errors: err.errors }),
        });
    }

    // 2. Check if it's a Zod schema validation error
    if (err instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
            const field = issue.path.join(".");
            formattedErrors[field] = issue.message;
        });

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: formattedErrors,
        });
    }

    // 3. Any unexpected crash (MongoDB down, syntax bug, undefined pointer, etc.)
    console.error("Unhandled Error:", err); // Log for backend debugging
    return res.status(500).json({
        success: false,
        message: "Internal server error, please try again later",
    });
};
