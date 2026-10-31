import { RequestHandler } from "express";
import {
    createEmployeeSchema,
    updateEmployeeSchema,
    employeeIdSchema,
    getEmployeesQuerySchema,
} from "../validators/employee.validator";
import {
    createEmployeeService,
    getAllEmployeesService,
    getEmployeeByIdService,
    updateEmployeeService,
    deleteEmployeeService,
    toggleEmployeeStatusService,
} from "../services/employee.service";

export const createEmployee: RequestHandler = async (req, res, next) => {
    try {
        const body = createEmployeeSchema.parse(req.body);
        const employee = await createEmployeeService(body);

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee,
        });
    } catch (error) {
        next(error);
    }
};

export const getEmployees: RequestHandler = async (req, res, next) => {
    try {
        const query = getEmployeesQuerySchema.parse(req.query);
        const result = await getAllEmployeesService(query);

        res.status(200).json({
            success: true,
            message: "Employees fetched successfully",
            data: result.employees,
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
};

export const getEmployeeById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = employeeIdSchema.parse(req.params);
        const employee = await getEmployeeByIdService(id);

        res.status(200).json({
            success: true,
            message: "Employee fetched successfully",
            data: employee,
        });
    } catch (error) {
        next(error);
    }
};

export const updateEmployee: RequestHandler = async (req, res, next) => {
    try {
        const { id } = employeeIdSchema.parse(req.params);
        const body = updateEmployeeSchema.parse(req.body);
        const employee = await updateEmployeeService(id, body);

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: employee,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteEmployee: RequestHandler = async (req, res, next) => {
    try {
        const { id } = employeeIdSchema.parse(req.params);
        await deleteEmployeeService(id);

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const toggleEmployeeStatus: RequestHandler = async (req, res, next) => {
    try {
        const { id } = employeeIdSchema.parse(req.params);
        const employee = await toggleEmployeeStatusService(id);

        res.status(200).json({
            success: true,
            message: `Employee status updated to ${employee.status === 1 ? "Active" : "Inactive"
                }`,
            data: employee,
        });
    } catch (error) {
        next(error);
    }
};
