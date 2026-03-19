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