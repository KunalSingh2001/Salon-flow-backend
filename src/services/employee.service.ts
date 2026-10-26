import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
import {
    CreateEmployeeInput,
    UpdateEmployeeInput,
    GetEmployeesQuery,
} from "../validators/employee.validator";

export interface EmployeeResponse {
    id: string;
    name: string;
    age: number;
    gender: string;
    gander: string;
    image: string | null;
    experience: number;
    experiance: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export const formatEmployeeResponse = (employee: any): EmployeeResponse => {
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

export const createEmployeeService = async (
    data: CreateEmployeeInput
): Promise<EmployeeResponse> => {
    const employee = await prisma.employee.create({
        data: {
            name: data.name,
            age: data.age,
            gender: data.gender,
            image: data.image,
            experience: data.experience,
            status: data.status,
        },
    });

    return formatEmployeeResponse(employee);
};

export const getAllEmployeesService = async (query: GetEmployeesQuery) => {
    const {
        search,
        gender,
        gander,
        status,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
    } = query;

    const where: any = {};

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
        prisma.employee.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder,
            },
        }),
        prisma.employee.count({ where }),
    ]);

    return {
        employees: employees.map(formatEmployeeResponse),
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

export const getEmployeeByIdService = async (
    id: string
): Promise<EmployeeResponse> => {
    const employee = await prisma.employee.findUnique({
        where: { id },
    });

    if (!employee) {
        throw new AppError("Employee not found", 404, {
            id: "No employee found with the provided ID",
        });
    }

    return formatEmployeeResponse(employee);
};

export const updateEmployeeService = async (
    id: string,
    data: UpdateEmployeeInput
): Promise<EmployeeResponse> => {
    // Check if employee exists
    await getEmployeeByIdService(id);

    const updatedEmployee = await prisma.employee.update({
        where: { id },
        data,
    });

    return formatEmployeeResponse(updatedEmployee);
};

export const deleteEmployeeService = async (id: string) => {
    // Check if employee exists
    await getEmployeeByIdService(id);

    await prisma.employee.delete({
        where: { id },
    });

    return { id, message: "Employee deleted successfully" };
};

export const toggleEmployeeStatusService = async (
    id: string
): Promise<EmployeeResponse> => {
    const existing = await getEmployeeByIdService(id);
    const newStatus = existing.status === 1 ? 0 : 1;

    const updatedEmployee = await prisma.employee.update({
        where: { id },
        data: {
            status: newStatus,
        },
    });

    return formatEmployeeResponse(updatedEmployee);
};
