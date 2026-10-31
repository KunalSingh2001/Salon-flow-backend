import { Router } from "express";
import { getAppointments } from "../controllers/appointment.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Only authenticated users can access the appointments listing
router.route("/")
    .get(authenticate, getAppointments);

export default router;
