import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import staticRoutes from "./routes/static.routes.js";
import authApiV1Routes from "./routes/api/v1/auth.routes.js";
import notesApiV1Routes from "./routes/api/v1/notes.routes.js";

import { notFound, errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.resolve("public")));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/", staticRoutes);
app.use("/users", userRoutes);
app.use("/notes", notesRoutes);

app.use("/api/v1/auth", authApiV1Routes);
app.use("/api/v1/notes", notesApiV1Routes);

app.use(notFound);
app.use(errorHandler);

export { app };
