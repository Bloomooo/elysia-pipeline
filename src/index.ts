import { Elysia } from "elysia";
import * as studiantRoutes from "./routes/student/student.route";
const app = new Elysia().use(studiantRoutes.studentRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
