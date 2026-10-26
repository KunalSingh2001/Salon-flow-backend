import { Router } from "express";
import employeeRoutes from "./employee.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employees", employeeRoutes);

export default router;
