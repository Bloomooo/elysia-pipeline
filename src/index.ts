import { Elysia } from "elysia";
import * as studiantRoutes from "./routes/student/student.route";
import OpenAPI, {fromTypes} from "@elysiajs/openapi";
export const app = new Elysia().use(studiantRoutes.studentRoutes);

if (import.meta.main) {
    app.listen(3000);
    app.use(
        OpenAPI({
            references: fromTypes()
        })
    );
    console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
}
