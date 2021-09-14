import express from "express";
import cors from "cors";

import booksRouter from "./services/books/index.js";
import studentsRouter from "./services/students/index.js";
import listEndpoints from "express-list-endpoints";

// === Server ===
const server = express();
const port = 3003;
// === COnfiguration | Before endpoints! ===
// body converter
server.use(cors());
server.use(express.json());
// ==== ROUTES / ENDPOINTS ====
server.use("/students", studentsRouter);
server.use("/books", booksRouter);

server.listen(port, () => {
  console.log("Hello", port);
});
console.table(listEndpoints(server));
