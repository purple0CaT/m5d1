// ======== STUDENTS CRUD =========
import express from "express";
const booksRouter = express.Router();
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// get url of index.js
const curentJson = fileURLToPath(import.meta.url);
// path dir
const currentDirP = dirname(curentJson);
console.log("Book_dir -", currentDirP);
// concatenate / Do not use +!!!
const studentJson = join(currentDirP, "books.json");

// CREATE / POST
booksRouter.post("/");
// READ / GET
booksRouter.get("/");
// READ / GET /:id
booksRouter.get("/:id");
// UPDATE / PUT /:id
booksRouter.put("/:id");
// DELETE / :id
booksRouter.delete("/:id");

export default booksRouter;
