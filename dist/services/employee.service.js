"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleEmployeeStatusService = exports.deleteEmployeeService = exports.updateEmployeeService = exports.getEmployeeByIdService = exports.getAllEmployeesService = exports.createEmployeeService = exports.formatEmployeeResponse = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = require("../utils/AppError");
const formatEmployeeResponse = (employee) => {
    return {
        id: employee.id,
        name: employee.name,
        age: employee.age,
        gender: employee.gender,
        gander: employee.gender, // Alias for compatibility with requested naming
        image: employee.image ?? null,
        experience: employee.experience,
        experiance: employee.experience, // Alias for compatibility with requested naming
        status: employee.status,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
    };
};
exports.formatEmployeeResponse = formatEmployeeResponse;
const createEmployeeService = async (data) => {
    const employee = await prisma_1.default.employee.create({
        data: {
            name: data.name,
            age: data.age,
            gender: data.gender,
            image: data.image,
            experience: data.experience,
            status: data.status,
        },
    });
    return (0, exports.formatEmployeeResponse)(employee);
};
exports.createEmployeeService = createEmployeeService;
const getAllEmployeesService = async (query) => {
    const { search, gender, gander, status, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", } = query;
    const where = {};
    if (search) {
        where.name = {
            contains: search,
            mode: "insensitive",
        };
    }
    const resolvedGender = gender || gander;
    if (resolvedGender) {
        where.gender = {
            equals: resolvedGender,
            mode: "insensitive",
        };
    }
    if (status !== undefined) {
        where.status = status;
    }
    const skip = (page - 1) * limit;
    const [employees, total] = await Promise.all([
        prisma_1.default.employee.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder,
            },
        }),
        prisma_1.default.employee.count({ where }),
    ]);
    return {
        employees: employees.map(exports.formatEmployeeResponse),
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1,
        },
    };
};
exports.getAllEmployeesService = getAllEmployeesService;
const getEmployeeByIdService = async (id) => {
    const employee = await prisma_1.default.employee.findUnique({
        where: { id },
    });
    if (!employee) {
        throw new AppError_1.AppError("Employee not found", 404, {
            id: "No employee found with the provided ID",
        });
    }
    return (0, exports.formatEmployeeResponse)(employee);
};
exports.getEmployeeByIdService = getEmployeeByIdService;
const updateEmployeeService = async (id, data) => {
    // Check if employee exists
    await (0, exports.getEmployeeByIdService)(id);
    const updatedEmployee = await prisma_1.default.employee.update({
        where: { id },
        data,
    });
    return (0, exports.formatEmployeeResponse)(updatedEmployee);
};
exports.updateEmployeeService = updateEmployeeService;
const deleteEmployeeService = async (id) => {
    // Check if employee exists
    await (0, exports.getEmployeeByIdService)(id);
    await prisma_1.default.employee.delete({
        where: { id },
    });
    return { id, message: "Employee deleted successfully" };
};
exports.deleteEmployeeService = deleteEmployeeService;
const toggleEmployeeStatusService = async (id) => {
    const existing = await (0, exports.getEmployeeByIdService)(id);
    const newStatus = existing.status === 1 ? 0 : 1;
    const updatedEmployee = await prisma_1.default.employee.update({
        where: { id },
        data: {
            status: newStatus,
        },
    });
    return (0, exports.formatEmployeeResponse)(updatedEmployee);
};
exports.toggleEmployeeStatusService = toggleEmployeeStatusService;
