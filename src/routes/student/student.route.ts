import { Elysia, t } from "elysia";
import * as studentController from "../../controllers/student/student.controller";
import {StudentSchema} from "../../models/student.model";

const ErrorSchema = t.Object({ message: t.String() });

export const studentRoutes = new Elysia({ prefix: "/students" })
    .get("/", (ctx) => studentController.getStudents(ctx), {
        query: t.Object({
            page: t.Optional(t.String({ description: "Page number (default: 1)" })),
            limit: t.Optional(t.String({ description: "Number of students per page (default: 10)" })),
            sort: t.Optional(
                t.Union(
                    [
                        t.Literal("id"),
                        t.Literal("firstName"),
                        t.Literal("lastName"),
                        t.Literal("email"),
                        t.Literal("grade"),
                        t.Literal("field"),
                    ],
                    { description: "Field to sort by" }
                )
            ),
            order: t.Optional(
                t.Union([t.Literal("asc"), t.Literal("desc")], {
                    description: "Sort order (default: asc)",
                })
            ),
        }),
        detail: {
            tags: ["Students"],
            summary: "Get all students",
            description:
                "Returns a paginated and optionally sorted list of all students. Supports pagination via `page` & `limit`, and sorting via `sort` & `order`.",
            responses: {
                200: {
                    description: "Paginated list of students",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    page: { type: "number", example: 1 },
                                    limit: { type: "number", example: 10 },
                                    total: { type: "number", example: 42 },
                                    data: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/StudentResponse" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    })

    .get("/reset", (ctx) => studentController.resetStudents(ctx), {
        detail: {
            tags: ["Students"],
            summary: "Reset students",
            description: "Resets the students collection to its default state. Returns HTTP 204.",
            responses: {
                204: { description: "Students successfully reset" },
            },
        },
    })

    .get("/stats", (ctx) => studentController.getStats(ctx), {
        detail: {
            tags: ["Students"],
            summary: "Get student statistics",
            description: "Returns aggregated statistics about all students (counts, grade averages, field distribution, etc.)",
            responses: {
                200: { description: "Statistics retrieved successfully" },
            },
        },
    })

    .get("/search", (ctx) => studentController.searchStudents(ctx), {
        query: t.Object({
            q: t.String({ description: "Search query string (required). Searches across student fields." }),
        }),
        detail: {
            tags: ["Students"],
            summary: "Search students",
            description: "Search for students using a query string `q`. Returns matching students. The `q` parameter is required.",
            responses: {
                200: {
                    description: "Matching students returned successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/StudentResponse" },
                            },
                        },
                    },
                },
                400: {
                    description: "Missing or empty `q` parameter",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                            example: { message: "Le paramètre 'q' est requis" },
                        },
                    },
                },
            },
        },
    })

    .get("/:id", (ctx) => studentController.getStudentById(ctx), {
        params: t.Object({
            id: t.String({ description: "Numeric student ID" }),
        }),
        detail: {
            tags: ["Students"],
            summary: "Get a student by ID",
            description: "Returns a single student matching the given numeric ID.",
            responses: {
                200: {
                    description: "Student found",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/StudentResponse" },
                        },
                    },
                },
                400: {
                    description: "Invalid ID (not a number)",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                            example: { message: "ID invalide" },
                        },
                    },
                },
                404: {
                    description: "Student not found",
                    content: {
                        "application/json": {
                            schema: { type: "string", example: "Student not found" },
                        },
                    },
                },
            },
        },
    })

    .post("/", (ctx) => studentController.createStudent(ctx), {
        body: t.Omit(StudentSchema, ["id"]),
        detail: {
            tags: ["Students"],
            summary: "Create a new student",
            description: "Creates a new student record. The `email` must be unique. `grade` must be between 0 and 20. `field` must be one of the allowed values.",
            responses: {
                201: {
                    description: "Student created successfully",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/StudentResponse" },
                        },
                    },
                },
                400: {
                    description: "Invalid student data",
                    content: {
                        "application/json": {
                            schema: { type: "string", example: "Invalid student data" },
                        },
                    },
                },
                409: {
                    description: "A student with this email already exists",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                            example: { message: "Student already exists" },
                        },
                    },
                },
            },
        },
    })

    .put("/:id", (ctx) => studentController.updateStudent(ctx), {
        params: t.Object({
            id: t.String({ description: "Numeric student ID" }),
        }),
        body: t.Partial(t.Omit(StudentSchema, ["id"])),
        detail: {
            tags: ["Students"],
            summary: "Update a student",
            description: "Updates an existing student record by its numeric ID. All body fields follow the same rules as creation.",
            responses: {
                200: {
                    description: "Student updated successfully",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/StudentResponse" },
                        },
                    },
                },
                400: {
                    description: "Invalid ID (not a number)",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                            example: { message: "ID invalide" },
                        },
                    },
                },
                404: {
                    description: "Student not found",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                            example: { message: "Student not found" },
                        },
                    },
                },
            },
        },
    })

    .delete("/:id", (ctx) => studentController.deleteStudent(ctx), {
        params: t.Object({
            id: t.String({ description: "Numeric student ID" }),
        }),
        detail: {
            tags: ["Students"],
            summary: "Delete a student",
            description: "Permanently deletes a student by its numeric ID.",
            responses: {
                200: {
                    description: "Student deleted successfully",
                    content: {
                        "application/json": {
                            schema: { type: "string", example: "Student deleted" },
                        },
                    },
                },
                404: {
                    description: "Student not found",
                    content: {
                        "application/json": {
                            schema: { type: "string", example: "Student not found" },
                        },
                    },
                },
            },
        },
    });