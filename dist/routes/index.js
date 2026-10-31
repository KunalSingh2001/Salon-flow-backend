"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_routes_1 = __importDefault(require("./employee.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const appointment_routes_1 = __importDefault(require("./appointment.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/employees", employee_routes_1.default);
router.use("/appointments", appointment_routes_1.default);
exports.default = router;
