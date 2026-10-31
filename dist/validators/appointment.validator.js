"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentsQuerySchema = void 0;
const zod_1 = require("zod");
exports.getAppointmentsQuerySchema = zod_1.z.object({
    search: zod_1.z.string().trim().optional(),
    status: zod_1.z.string().trim().optional(),
    paymentStatus: zod_1.z.string().trim().optional(),
    staffId: zod_1.z.string().trim().optional(),
    userId: zod_1.z.string().trim().optional(),
    serviceId: zod_1.z.string().trim().optional(),
    startDate: zod_1.z.string().trim().optional(),
    endDate: zod_1.z.string().trim().optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
    sortBy: zod_1.z
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
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("desc"),
});
