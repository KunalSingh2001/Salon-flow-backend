import { z } from "zod";

export const createEmployeeSchema = z
    .object({
        name: z.string().trim().min(1, "Name is required"),
        age: z.coerce
            .number()
            .int("Age must be an integer")
            .min(1, "Age must be greater than 0")
            .max(120, "Age must be a valid number"),
        gender: z.string().trim().min(1, "Gender is required").optional(),
        gander: z.string().trim().min(1).optional(),
        image: z.string().trim().optional().nullable().default(null),
        experience: z.coerce
            .number()
            .min(0, "Experience cannot be negative")
            .optional(),
        experiance: z.coerce
            .number()
            .min(0, "Experience cannot be negative")
            .optional(),
        status: z.coerce.number().int().default(1),
    })
    .refine((data) => Boolean(data.gender || data.gander), {
        message: "Gender is required (provide 'gender' or 'gander')",
        path: ["gender"],
    })
    .transform((data) => {
        const resolvedGender = (data.gender || data.gander)!.trim();
        const resolvedExperience =
            data.experience !== undefined
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

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;

export const updateEmployeeSchema = z
    .object({
        name: z.string().trim().min(1, "Name cannot be empty").optional(),
        age: z.coerce
            .number()
            .int("Age must be an integer")
            .min(1, "Age must be greater than 0")
            .max(120, "Age must be a valid number")
            .optional(),
        gender: z.string().trim().min(1, "Gender cannot be empty").optional(),
        gander: z.string().trim().min(1, "Gender cannot be empty").optional(),
        image: z.string().trim().optional().nullable(),
        experience: z.coerce
            .number()
            .min(0, "Experience cannot be negative")
            .optional(),
        experiance: z.coerce
            .number()
            .min(0, "Experience cannot be negative")
            .optional(),
        status: z.coerce.number().int().optional(),
    })
    .transform((data) => {
        const updateData: {
            name?: string;
            age?: number;
            gender?: string;
            image?: string | null;
            experience?: number;
            status?: number;
        } = {};

        if (data.name !== undefined) updateData.name = data.name.trim();
        if (data.age !== undefined) updateData.age = data.age;

        const resolvedGender = data.gender ?? data.gander;
        if (resolvedGender !== undefined) updateData.gender = resolvedGender.trim();

        if (data.image !== undefined) {
            updateData.image =
                data.image && data.image.trim().length > 0 ? data.image.trim() : null;
        }

        const resolvedExp =
            data.experience !== undefined ? data.experience : data.experiance;
        if (resolvedExp !== undefined) updateData.experience = resolvedExp;

        if (data.status !== undefined) updateData.status = data.status;

        return updateData;
    });

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;

export const employeeIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid employee ID format"),
});

export const getEmployeesQuerySchema = z.object({
    search: z.string().trim().optional(),
    gender: z.string().trim().optional(),
    gander: z.string().trim().optional(),
    status: z.coerce.number().int().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    sortBy: z
        .enum(["name", "age", "experience", "status", "createdAt"])
        .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type GetEmployeesQuery = z.infer<typeof getEmployeesQuerySchema>;
