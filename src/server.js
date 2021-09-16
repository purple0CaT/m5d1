import express from "express";
import cors from "cors";
import { join } from "path";

// import booksRouter from "./services/books/index.js";
import studentsRouter from "./services/students/index.js";
import listEndpoints from "express-list-endpoints";
import filesRouter from "./services/files/files.js";
import {
  genericErrHandl,
  notFoundErrHandl,
  forbiddenFoundErrHandl,
  badreqFoundErrHandl,
} from "./errorHandler.js";

// === Server ===
const server = express();
const port = 3003;

const loggerMiddleware = (req, res, next) => {
  console.log(`Req ${req.method}, Url ${req.url} -- ${new Date()} ${req}`);
  next();
};
const publicFolderPath = join(process.cwd(), "/public");
console.log(publicFolderPath);
// body converter
server.use(express.static(publicFolderPath));
server.use(loggerMiddleware); // - Global
server.use(cors());
server.use(express.json());
// ==== ROUTES / ENDPOINTS ====
server.use("/students", studentsRouter);
server.use("/files", filesRouter);
// server.use("/books", booksRouter);
// ERROR MIDDLEWARE
server.use(badreqFoundErrHandl);
server.use(notFoundErrHandl);
server.use(forbiddenFoundErrHandl);
server.use(genericErrHandl);

// Console log
console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("Port -", port);
});
