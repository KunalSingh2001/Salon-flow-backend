"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const router = (0, express_1.Router)();
router.route("/")
    .get(employee_controller_1.getEmployees)
    .post(employee_controller_1.createEmployee);
router.route("/:id")
    .get(employee_controller_1.getEmployeeById)
    .put(employee_controller_1.updateEmployee)
    .delete(employee_controller_1.deleteEmployee);
router.patch("/:id/status", employee_controller_1.toggleEmployeeStatus);
exports.default = router;
