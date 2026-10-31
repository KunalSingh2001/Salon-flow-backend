import { z } from "zod";

export const getAppointmentsQuerySchema = z.object({
    search: z.string().trim().optional(),
    status: z.string().trim().optional(),
    paymentStatus: z.string().trim().optional(),
    staffId: z.string().trim().optional(),
    userId: z.string().trim().optional(),
    serviceId: z.string().trim().optional(),
    startDate: z.string().trim().optional(),
    endDate: z.string().trim().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    sortBy: z
        .enum([
            "appointmentDate",
            "appointmentNumber",
            "customerName",
            "status",
            "paymentStatus",
            "amount",
            "createdAt",
        ])
        .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type GetAppointmentsQuery = z.infer<typeof getAppointmentsQuerySchema>;

