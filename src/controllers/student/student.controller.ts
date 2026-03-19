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

    if (studentService.getStudentById(student.id) !== undefined){
        ctx.set.status = 409;
        ctx.body = "Student already exists";
    }

    const createdStudent = studentService.createStudent(student);
    ctx.set.status = 201;
    ctx.body = createdStudent;
    return ctx.body;
}

export const updateStudent = (ctx: Context) => {
    const { id } = ctx.params;
    const student = ctx.body as Student;

    studentService.updateStudent(parseInt(id), student);
    ctx.set.status = 204;
    ctx.body = "Student updated";
}

export const deleteStudent = (ctx: Context) => {
    const { id } = ctx.params;
    const student = studentService.getStudentById(parseInt(id));
    if(student === undefined) {
        ctx.set.status = 404;
        ctx.body = "Student not found";
    }

    studentService.deleteStudent(parseInt(id));
    ctx.set.status = 204;
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
    return studentService.getStats();
};
