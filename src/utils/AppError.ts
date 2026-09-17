export class AppError extends Error {
    public statusCode: number;
    public errors?: Record<string, string>;
    constructor(message: string, statusCode: number = 400, errors?: Record<string, string>) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        // Maintains proper stack trace in V8 engines
        Error.captureStackTrace(this, this.constructor);
    }
}