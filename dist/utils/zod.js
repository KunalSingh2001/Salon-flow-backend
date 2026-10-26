"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZodFieldErrors = void 0;
const getZodFieldErrors = (error) => {
    const fieldErrors = {};
    error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
            fieldErrors[field] = issue.message;
        }
    });
    return fieldErrors;
};
exports.getZodFieldErrors = getZodFieldErrors;
