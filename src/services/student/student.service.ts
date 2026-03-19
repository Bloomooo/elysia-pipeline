import {Student} from "../../models/student.model";

let initialStudents: Student[] = [
    { id: 1, firstName: "Alice", lastName: "Dupont", email: "alice@test.com", grade: 15, field: "informatique" },
    { id: 2, firstName: "Bob", lastName: "Martin", email: "bob@test.com", grade: 12, field: "mathématiques" },
    { id: 3, firstName: "Charlie", lastName: "Durand", email: "charlie@test.com", grade: 18, field: "physique" },
    { id: 4, firstName: "Diane", lastName: "Lefevre", email: "diane@test.com", grade: 9, field: "chimie" },
    { id: 5, firstName: "Ethan", lastName: "Moreau", email: "ethan@test.com", grade: 14, field: "informatique" }
];

let students: Student[] = structuredClone(initialStudents);
let nextId = 6;

export const getAllStudents = () => students;

export const resetStudents = () => {
    students = structuredClone(initialStudents);
    nextId = 6;
};
