"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesQuerySchema = exports.employeeIdSchema = exports.updateEmployeeSchema = exports.createEmployeeSchema = void 0;
const zod_1 = require("zod");
exports.createEmployeeSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(1, "Name is required"),
    age: zod_1.z.coerce
        .number()
        .int("Age must be an integer")
        .min(1, "Age must be greater than 0")
        .max(120, "Age must be a valid number"),
    gender: zod_1.z.string().trim().min(1, "Gender is required").optional(),
    gander: zod_1.z.string().trim().min(1).optional(),
    image: zod_1.z.string().trim().optional().nullable().default(null),
    experience: zod_1.z.coerce
        .number()
        .min(0, "Experience cannot be negative")
        .optional(),
    experiance: zod_1.z.coerce
        .number()
        .min(0, "Experience cannot be negative")
        .optional(),
    status: zod_1.z.coerce.number().int().default(1),
})
    .refine((data) => Boolean(data.gender || data.gander), {
    message: "Gender is required (provide 'gender' or 'gander')",
    path: ["gender"],
})
    .transform((data) => {
    const resolvedGender = (data.gender || data.gander).trim();
    const resolvedExperience = data.experience !== undefined
        ? data.experience
        : data.experiance !== undefined
            ? data.experiance
            : 0;
    return {
        name: data.name.trim(),
        age: data.age,
        gender: resolvedGender,
        image: data.image && data.image.trim().length > 0 ? data.image.trim() : null,
        experience: resolvedExperience,
        status: data.status ?? 1,
    };
});
exports.updateEmployeeSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(1, "Name cannot be empty").optional(),
    age: zod_1.z.coerce
        .number()
        .int("Age must be an integer")
        .min(1, "Age must be greater than 0")
        .max(120, "Age must be a valid number")
        .optional(),
    gender: zod_1.z.string().trim().min(1, "Gender cannot be empty").optional(),
    gander: zod_1.z.string().trim().min(1, "Gender cannot be empty").optional(),
    image: zod_1.z.string().trim().optional().nullable(),
    experience: zod_1.z.coerce
        .number()
        .min(0, "Experience cannot be negative")
        .optional(),
    experiance: zod_1.z.coerce
        .number()
        .min(0, "Experience cannot be negative")
        .optional(),
    status: zod_1.z.coerce.number().int().optional(),
})
    .transform((data) => {
    const updateData = {};
    if (data.name !== undefined)
        updateData.name = data.name.trim();
    if (data.age !== undefined)
        updateData.age = data.age;
    const resolvedGender = data.gender ?? data.gander;
    if (resolvedGender !== undefined)
        updateData.gender = resolvedGender.trim();
    if (data.image !== undefined) {
        updateData.image =
            data.image && data.image.trim().length > 0 ? data.image.trim() : null;
    }
    const resolvedExp = data.experience !== undefined ? data.experience : data.experiance;
    if (resolvedExp !== undefined)
        updateData.experience = resolvedExp;
    if (data.status !== undefined)
        updateData.status = data.status;
    return updateData;
});
exports.employeeIdSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid employee ID format"),
});
exports.getEmployeesQuerySchema = zod_1.z.object({
    search: zod_1.z.string().trim().optional(),
    gender: zod_1.z.string().trim().optional(),
    gander: zod_1.z.string().trim().optional(),
    status: zod_1.z.coerce.number().int().optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
    sortBy: zod_1.z
        .enum(["name", "age", "experience", "status", "createdAt"])
        .default("createdAt"),
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("desc"),
});
