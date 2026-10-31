import { Router } from "express";
import employeeRoutes from "./employee.routes";
import authRoutes from "./auth.routes";
import appointmentRoutes from "./appointment.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employees", employeeRoutes);
router.use("/appointments", appointmentRoutes);

export default router;
