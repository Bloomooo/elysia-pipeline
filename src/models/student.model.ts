import {t} from "elysia";

export type Field = "informatique" | "mathématiques" | "physique" | "chimie";

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    grade: number;
    field: Field;
}

// Pour OpenAPI
export const StudentSchema = t.Object({
    id: t.Optional(t.Number({ description: "Unique student ID (auto-generated)" })),
    firstName: t.String({ description: "First name of the student" }),
    lastName: t.String({ description: "Last name of the student" }),
    email: t.String({ format: "email", description: "Email address of the student" }),
    grade: t.Number({ minimum: 0, maximum: 20, description: "Grade of the student (0-20)" }),
    field: t.Union(
        [
            t.Literal("informatique"),
            t.Literal("mathématiques"),
            t.Literal("physique"),
            t.Literal("chimie"),
        ],
        { description: "Field of study" }
    ),
});

export const StudentResponseSchema = t.Object({
    id: t.Number(),
    firstName: t.String(),
    lastName: t.String(),
    email: t.String({ format: "email" }),
    grade: t.Number({ minimum: 0, maximum: 20 }),
    field: t.Union([
        t.Literal("informatique"),
        t.Literal("mathématiques"),
        t.Literal("physique"),
        t.Literal("chimie"),
    ]),
});