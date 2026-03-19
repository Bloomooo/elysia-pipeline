export type Field = "informatique" | "mathématiques" | "physique" | "chimie";

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    grade: number;
    field: Field;
}