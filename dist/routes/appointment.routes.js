"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("../controllers/appointment.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Only authenticated users can access the appointments listing
router.route("/")
    .get(auth_middleware_1.authenticate, appointment_controller_1.getAppointments);
exports.default = router;
