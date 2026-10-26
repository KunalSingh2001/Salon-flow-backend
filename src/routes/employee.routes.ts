import { Router } from "express";
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    toggleEmployeeStatus,
} from "../controllers/employee.controller";

const router = Router();

router.route("/")
    .get(getEmployees)
    .post(createEmployee);

router.route("/:id")
    .get(getEmployeeById)
    .put(updateEmployee)
    .delete(deleteEmployee);

router.patch("/:id/status", toggleEmployeeStatus);

export default router;
