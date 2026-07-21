import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Get Employees");
});

router.post("/", (req, res) => {
    res.send("Create Employee");
});

export default router;
