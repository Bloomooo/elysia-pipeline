import * as studentService from "../../services/student/student.service";
import {Student} from "../../models/student.model";
import {Context} from "elysia";

export const getStudents = (ctx: Context) => {
    const students = studentService.getAllStudents();

    ctx.body = students;
    ctx.set.status = 200;

    if (students.length === 0) {
        ctx.set.status = 404;
    }

    return ctx.body;
};

export const resetStudents = (ctx: Context) => {
    studentService.resetStudents();
    ctx.set.status = 204;
    ctx.body = "Students reset";
    return ctx.body;
};