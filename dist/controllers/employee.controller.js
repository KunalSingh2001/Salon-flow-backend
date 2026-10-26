"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleEmployeeStatus = exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getEmployees = exports.createEmployee = void 0;
const employee_validator_1 = require("../validators/employee.validator");
const employee_service_1 = require("../services/employee.service");
const createEmployee = async (req, res, next) => {
    try {
        const body = employee_validator_1.createEmployeeSchema.parse(req.body);
        const employee = await (0, employee_service_1.createEmployeeService)(body);
        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createEmployee = createEmployee;
const getEmployees = async (req, res, next) => {
    try {
        const query = employee_validator_1.getEmployeesQuerySchema.parse(req.query);
        const result = await (0, employee_service_1.getAllEmployeesService)(query);
        res.status(200).json({
            success: true,
            message: "Employees fetched successfully",
            data: result.employees,
            pagination: result.pagination,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getEmployees = getEmployees;
const getEmployeeById = async (req, res, next) => {
    try {
        const { id } = employee_validator_1.employeeIdSchema.parse(req.params);
        const employee = await (0, employee_service_1.getEmployeeByIdService)(id);
        res.status(200).json({
            success: true,
            message: "Employee fetched successfully",
            data: employee,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getEmployeeById = getEmployeeById;
const updateEmployee = async (req, res, next) => {
    try {
        const { id } = employee_validator_1.employeeIdSchema.parse(req.params);
        const body = employee_validator_1.updateEmployeeSchema.parse(req.body);
        const employee = await (0, employee_service_1.updateEmployeeService)(id, body);
        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: employee,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = employee_validator_1.employeeIdSchema.parse(req.params);
        await (0, employee_service_1.deleteEmployeeService)(id);
        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEmployee = deleteEmployee;
const toggleEmployeeStatus = async (req, res, next) => {
    try {
        const { id } = employee_validator_1.employeeIdSchema.parse(req.params);
        const employee = await (0, employee_service_1.toggleEmployeeStatusService)(id);
        res.status(200).json({
            success: true,
            message: `Employee status updated to ${employee.status === 1 ? "Active" : "Inactive"}`,
            data: employee,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.toggleEmployeeStatus = toggleEmployeeStatus;
