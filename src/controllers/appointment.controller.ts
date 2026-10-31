import { RequestHandler } from "express";
import { getAppointmentsQuerySchema } from "../validators/appointment.validator";
import { getAllAppointmentsService } from "../services/appointment.service";

export const getAppointments: RequestHandler = async (req, res, next) => {
    try {
        const query = getAppointmentsQuerySchema.parse(req.query);
        const result = await getAllAppointmentsService(query);

        res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: result.appointments,
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
};

