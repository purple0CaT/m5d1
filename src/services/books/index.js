// ======== STUDENTS CRUD =========
import express from 'express'
const booksRouter = express.Router()
// CREATE / POST
booksRouter.post("/")
// READ / GET
booksRouter.get("/")
// READ / GET /:id
booksRouter.get("/:id")
// UPDATE / PUT /:id
booksRouter.put("/:id")
// DELETE / :id
booksRouter.delete("/:id")

export default booksRouter