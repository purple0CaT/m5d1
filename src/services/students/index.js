// ======== STUDENTS CRUD =========
import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { studentValidationMiddleware } from "./validation.js";
import { validationResult } from "express-validator";
// =
const studentsRouter = express.Router();
// PATH
// get url of index.js
const studentJson = join(
  dirname(fileURLToPath(import.meta.url)),
  "students.json"
);
console.log("Stud_dir -", studentJson);
// pull and save
const getStudent = () => JSON.parse(fs.readFileSync(studentJson));
const writeStudent = (content) =>
  fs.writeFileSync(studentJson, JSON.stringify(content));
// == READ / GET
studentsRouter.get("/", (req, res) => {
  try {
    // read stud.json
    const students = getStudent();
    //   return file
    res.send(students);
  } catch (error) {
    next(error);
  }
});
// =
// == CREATE / POST
studentsRouter.post("/", studentValidationMiddleware, (req, res, next) => {
  const errList = validationResult(req);
  if (!errList.isEmpty()) {
    next(createHttpError(400, "Error body"));
  } else {
    try {
      // read the request body and response
      const newStud = { ...req.body, id: uniqid(), createdAt: new Date() };
      console.log(newStud);
      //   PATH
      const students = getStudent();
      // == PUSH
      students.push(newStud);
      //   write array back to the file
      writeStudent(students);
      //   RESPONSE
      console.log(students);
      res.status(201).send(newStud);
    } catch (error) {
      next(createHttpError(402));
    }
  }
});
// == READ / GET /:id
studentsRouter.get("/:studentID", (req, res, next) => {
  try {
    console.log(req.params.studentID);
    const students = getStudent();
    //  find by id
    const student = students.find((s) => s.id == req.params.studentID);
    // return
    if (student) {
      res.send(student);
    } else {
      next(createHttpError(404, "Student id not found"));
    }
  } catch (error) {
    next(error);
  }
});
// == UPDATE / PUT /:id
studentsRouter.put("/:studentID", (req, res, next) => {
  try {
    // Get students
    const students = getStudent();
    //   modify student
    //   const remainStud = students.filter((stud) => stud.id != req.params.studentID);
    //   const updateStud = { ...req.body, id: req.params.studentID };
    //   remainStud.push(updateStud);
    // Index
    const index = students.findIndex(
      (student) => student.id == req.params.studentID
    );
    const updatedStudent = { ...students[index], ...req.body };
    students[index] = updatedStudent;
    //   write array back to the file
    writeStudent(students);
    //   RESPONSE
    res.status(203).send(students);
  } catch (error) {
    next(createHttpError(402));
  }
});
// == DELETE / :id
studentsRouter.delete("/:studentID", (req, res, next) => {
  try {
    // Get students
    const students = getStudent();
    // FIlter student id
    const remainStudent = students.filter(
      (std) => std.id != req.params.studentID
    );
    //   write array back to the file
    writeStudent(remainStudent);
    //   RESPONSE
    console.log(remainStudent);
    res.status(204).send();
  } catch (error) {
    next(createHttpError(402));
  }
});

export default studentsRouter;
