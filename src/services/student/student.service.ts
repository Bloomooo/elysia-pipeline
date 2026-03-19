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
export const getStudentById = (id: number) => students.find(student => student.id === id);
export const createStudent = (student: Student) => {
    student.id = nextId;
    students.push(student);
    nextId++;
    return student;
}

export const updateStudent = (id: number, data: Partial<Student>) => {
    let updatedStudent = null;

    students = students.map((s) => {
        if (s.id === id) {
            updatedStudent = {
                ...s,
                ...data,
                id: s.id
            };
            return updatedStudent;
        }
        return s;
    });

    return updatedStudent;
};
export const deleteStudent = (id: number) => students = students.filter(student => student.id !== id);

export const resetStudents = () => {
    students = structuredClone(initialStudents);
    nextId = 6;
};

export const getStats = () => {
    const totalStudents = students.length;

    const averageGrade =
        totalStudents === 0
            ? 0
            : Number(
                (students.reduce((sum, s) => sum + s.grade, 0) / totalStudents).toFixed(2)
            );

    const studentsByField = students.reduce((acc: any, s) => {
        acc[s.field] = (acc[s.field] || 0) + 1;
        return acc;
    }, {});

    const bestStudent = students.reduce((best, s) =>
        s.grade > best.grade ? s : best
    );

    return {
        totalStudents,
        averageGrade,
        studentsByField,
        bestStudent,
    };
};

export const searchStudents = (query: string) => {
    const q = query.toLowerCase();

    return students.filter(
        (s) =>
            s.firstName.toLowerCase().includes(q) ||
            s.lastName.toLowerCase().includes(q)
    );
};

export const isValidStudent = (s: Omit<Student, "id">) => {
    if (
        !s ||
        !s.firstName ||
        !s.lastName ||
        !s.email ||
        s.grade === undefined ||
        !s.field
    ) {
        return false;
    }

    return (
        s.firstName.length >= 2 &&
        s.lastName.length >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email) &&
        s.grade >= 0 &&
        s.grade <= 20 &&
        ["informatique", "mathématiques", "physique", "chimie"].includes(s.field)
    );
};