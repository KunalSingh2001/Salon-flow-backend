import { ZodError } from "zod";

export const getZodFieldErrors = (
    error: ZodError
): Record<string, string> => {
    const fieldErrors: Record<string, string> = {};

    error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string") {
            fieldErrors[field] = issue.message;
        }
    });

    return fieldErrors;
};