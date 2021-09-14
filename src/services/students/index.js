// ======== STUDENTS CRUD =========
import express from 'express'
const studentsRouter = express.Router()
// CREATE / POST
studentsRouter.post("/")
// READ / GET
studentsRouter.get("/")
// READ / GET /:id
studentsRouter.get("/:id")
// UPDATE / PUT /:id
studentsRouter.put("/:id")
// DELETE / :id
studentsRouter.delete("/:id")

export default studentsRouter