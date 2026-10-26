"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    errors;
    constructor(message, statusCode = 400, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        // Maintains proper stack trace in V8 engines
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
