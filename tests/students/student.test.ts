import { describe, it, expect, beforeEach } from "bun:test";
import { app } from "../../src";

const base = "/students";

// helper
const request = (url: string, options?: RequestInit) =>
    app.handle(new Request(`http://localhost${url}`, options));

beforeEach(async () => {
    await request(`${base}/reset`);
});

describe("GET tests", () => {

    it("1. GET /students -> 200 + array", async () => {
        const res = await request(base);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
    });

    it("2. GET /students -> initial students", async () => {
        const res = await request(base);
        const data = await res.json();

        expect(data.length).toBe(5);
    });

    it("3. GET /students/:id valid", async () => {
        const res = await request(`${base}/1`);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.id).toBe(1);
    });

    it("4. GET /students/:id not found", async () => {
        const res = await request(`${base}/999`);

        expect(res.status).toBe(404);
    });

    it("5. GET /students/:id invalid", async () => {
        const res = await request(`${base}/abc`);

        expect(res.status).toBe(400);
    });
});

describe("POST tests", () => {

    const validStudent = {
        firstName: "Test",
        lastName: "User",
        email: "test@test.com",
        grade: 15,
        field: "informatique"
    };

    it("6. POST valid -> 201", async () => {
        const res = await request(base, {
            method: "POST",
            body: JSON.stringify(validStudent),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        expect(res.status).toBe(201);
        expect(data.id).toBeDefined();
    });

    it("7. POST missing field -> 400", async () => {
        const res = await request(base, {
            method: "POST",
            body: JSON.stringify({}),
            headers: { "Content-Type": "application/json" }
        });

        expect(res.status).toBe(400);
    });

    it("8. POST invalid grade -> 400", async () => {
        const res = await request(base, {
            method: "POST",
            body: JSON.stringify({ ...validStudent, grade: 25 }),
            headers: { "Content-Type": "application/json" }
        });

        expect(res.status).toBe(400);
    });

    it("9. POST duplicate email -> 409", async () => {
        await request(base, {
            method: "POST",
            body: JSON.stringify(validStudent),
            headers: { "Content-Type": "application/json" }
        });

        const res = await request(base, {
            method: "POST",
            body: JSON.stringify(validStudent),
            headers: { "Content-Type": "application/json" }
        });

        expect(res.status).toBe(409);
    });
});

describe("PUT tests", () => {

    it("10. PUT valid -> 200", async () => {
        const res = await request(`${base}/1`, {
            method: "PUT",
            body: JSON.stringify({ firstName: "Updated" }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.firstName).toBe("Updated");
    });

    it("11. PUT not found -> 404", async () => {
        const res = await request(`${base}/999`, {
            method: "PUT",
            body: JSON.stringify({ firstName: "Test" }),
            headers: { "Content-Type": "application/json" }
        });

        expect(res.status).toBe(404);
    });
});

describe("DELETE tests", () => {

    it("12. DELETE valid -> 200", async () => {
        const res = await request(`${base}/1`, {
            method: "DELETE"
        });

        expect(res.status).toBe(200);
    });

    it("13. DELETE not found -> 404", async () => {
        const res = await request(`${base}/999`, {
            method: "DELETE"
        });

        expect(res.status).toBe(404);
    });
});
