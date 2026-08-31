"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Get Employees");
});
router.post("/", (req, res) => {
    res.send("Create Employee");
});
exports.default = router;
