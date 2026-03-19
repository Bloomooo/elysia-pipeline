import { Elysia } from "elysia";
import * as studentController from "../../controllers/student/student.controller";

export const studentRoutes = new Elysia({ prefix: "/students" })
    .get("/", (ctx) => studentController.getStudents(ctx))
    .get("/reset", (ctx) => studentController.resetStudents(ctx))