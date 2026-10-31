"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointments = void 0;
const appointment_validator_1 = require("../validators/appointment.validator");
const appointment_service_1 = require("../services/appointment.service");
const getAppointments = async (req, res, next) => {
    try {
        const query = appointment_validator_1.getAppointmentsQuerySchema.parse(req.query);
        const result = await (0, appointment_service_1.getAllAppointmentsService)(query);
        res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: result.appointments,
            pagination: result.pagination,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAppointments = getAppointments;
