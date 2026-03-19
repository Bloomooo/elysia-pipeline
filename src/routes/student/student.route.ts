import { Elysia } from "elysia";
import * as studentController from "../../controllers/student/student.controller";

export const studentRoutes = new Elysia({ prefix: "/students" })
    .get("/", (ctx) => studentController.getStudents(ctx))
    .get("/reset", (ctx) => studentController.resetStudents(ctx))
    .get("/:id", (ctx) => studentController.getStudentById(ctx))
    .post("/", (ctx) => studentController.createStudent(ctx))
    .put("/:id", (ctx) => studentController.updateStudent(ctx))
    .delete("/:id", (ctx) => studentController.deleteStudent(ctx))