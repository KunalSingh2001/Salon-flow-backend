"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAppointmentsService = exports.formatAppointmentResponse = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const formatAppointmentResponse = (appointment) => {
    return {
        id: appointment.id,
        appointmentNumber: appointment.appointmentNumber,
        userId: appointment.userId ?? null,
        serviceId: appointment.serviceId ?? null,
        staffId: appointment.staffId ?? null,
        customerName: appointment.customerName,
        email: appointment.email,
        phone: appointment.phone,
        appointmentDate: appointment.appointmentDate,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        duration: appointment.duration,
        notes: appointment.notes ?? null,
        status: appointment.status,
        paymentStatus: appointment.paymentStatus,
        amount: appointment.amount,
        paymentMethod: appointment.paymentMethod ?? null,
        cancellationReason: appointment.cancellationReason ?? null,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
    };
};
exports.formatAppointmentResponse = formatAppointmentResponse;
const getAllAppointmentsService = async (query) => {
    const { search, status, paymentStatus, staffId, userId, serviceId, startDate, endDate, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", } = query;
    const where = {};
    if (search) {
        where.OR = [
            { customerName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { appointmentNumber: { contains: search, mode: "insensitive" } },
        ];
    }
    if (status) {
        where.status = { equals: status, mode: "insensitive" };
    }
    if (paymentStatus) {
        where.paymentStatus = { equals: paymentStatus, mode: "insensitive" };
    }
    if (staffId) {
        where.staffId = staffId;
    }
    if (userId) {
        where.userId = userId;
    }
    if (serviceId) {
        where.serviceId = serviceId;
    }
    if (startDate || endDate) {
        where.appointmentDate = {};
        if (startDate) {
            where.appointmentDate.gte = new Date(startDate);
        }
        if (endDate) {
            where.appointmentDate.lte = new Date(endDate);
        }
    }
    const skip = (page - 1) * limit;
    const [appointments, total] = await Promise.all([
        prisma_1.default.appointment.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder,
            },
        }),
        prisma_1.default.appointment.count({ where }),
    ]);
    return {
        appointments: appointments.map(exports.formatAppointmentResponse),
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1,
        },
    };
};
exports.getAllAppointmentsService = getAllAppointmentsService;
