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

export const getStudentById = (ctx: Context)  => {
    const { id } = ctx.params;
    if (isNaN(parseInt(id))) {
        ctx.set.status = 400;
        ctx.body = { message: "ID invalide" };
        return ctx.body;
    }
    const student = studentService.getStudentById(parseInt(id));
    ctx.body = student;
    ctx.set.status = 200;
    if(student === undefined) {
        ctx.body = "Student not found";
        ctx.set.status = 404;
    }
    return ctx.body;
}

export const createStudent = (ctx: Context) => {
    const student = ctx.body as Student;

    if (!studentService.isValidStudent(student)) {
        ctx.set.status = 400;
        ctx.body = "Invalid student data";
        return ctx.body;
    }

    const exists = studentService.getAllStudents().some(s => s.email === student.email);
    if (exists) {
        ctx.set.status = 409;
        ctx.body = { message: "Student already exists" };
        return ctx.body;
    }

    const createdStudent = studentService.createStudent(student);
    ctx.set.status = 201;
    ctx.body = createdStudent;
    return ctx.body;
}

export const updateStudent = (ctx: Context) => {
    const { id } = ctx.params;
    const student = ctx.body as Student;
    if (isNaN(parseInt(id))) {
        ctx.set.status = 400;
        ctx.body = { message: "ID invalide" };
        return ctx.body;
    }

    const updated = studentService.updateStudent(parseInt(id), student);

    if (!updated) {
        ctx.set.status = 404;
        ctx.body = { message: "Student not found" };
        return ctx.body;
    }
    ctx.set.status = 200;
    ctx.body = updated;
    return ctx.body;
}

export const deleteStudent = (ctx: Context) => {
    const { id } = ctx.params;
    const student = studentService.getStudentById(parseInt(id));
    if(!student) {
        ctx.set.status = 404;
        ctx.body = "Student not found";
        return ctx.body;
    }

    studentService.deleteStudent(parseInt(id));
    ctx.set.status = 200;
    ctx.body = "Student deleted";
    return ctx.body;
}

export const resetStudents = (ctx: Context) => {
    studentService.resetStudents();
    ctx.set.status = 204;
    ctx.body = "Students reset";
    return ctx.body;
};

export const getStats = (ctx: Context) => {
    ctx.set.status = 200;
    ctx.body = studentService.getStats();
    return ctx.body;
};

export const searchStudents = (ctx: Context) => {
    const query = ctx.query.q as string;

    if (!query || query.trim() === "") {
        ctx.set.status = 400;
        return { message: "Le paramètre 'q' est requis" };
    }

    return studentService.searchStudents(query);
};