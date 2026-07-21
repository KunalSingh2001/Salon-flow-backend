import { Router } from "express";
import employeeRoutes from "./employee.routes";
import authRoutes from "./auth.routes";
const router = Router();

router.use("/auth", authRoutes);

export default router;
