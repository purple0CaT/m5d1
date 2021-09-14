// ======== STUDENTS CRUD =========
import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// =
const studentsRouter = express.Router();
// PATH
// get url of index.js
const curentJson = fileURLToPath(import.meta.url);
// path dir
const currentDirP = dirname(curentJson);
console.log("Stud_dir -", currentDirP);
// concatenate / Do not use +!!!
const studentJson = join(currentDirP, "students.json");

// CREATE / POST
studentsRouter.get("/", (req, res) => {
  // read stud.json
  const studFile = fs.readFileSync(studentJson);
  const students = JSON.parse(studFile);
  //   return file
  res.send(students);
});
// READ / GET
studentsRouter.post("/", (req, res) => {
  res.send("Heyyyy!");
});
// READ / GET /:id
studentsRouter.get("/:studentID", (req, res) => {
  console.log(req.params.studentID);
  const students = JSON.parse(fs.readFileSync(studentJson));
  //  find by id
  const student = students.find((s) => s.id == req.params.studentID);
  // return
  if (student) {
    res.send(student);
  } else {
    res.send("403");
  }
});
// UPDATE / PUT /:id
studentsRouter.put("/:id", (req, res) => {
  res.send("Heyyyy!");
});
// DELETE / :id
studentsRouter.delete("/:id", (req, res) => {
  res.send("Heyyyy!");
});

export default studentsRouter;
