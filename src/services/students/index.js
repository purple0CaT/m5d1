// ======== STUDENTS CRUD =========
import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { studentValidationMiddleware } from "./validation.js";
import { validationResult } from "express-validator";
import { getStudent, writeStudent } from "../fs-tools.js";
// =
const studentsRouter = express.Router();
// == READ / GET
studentsRouter.get("/", async (req, res) => {
  try {
    // read stud.json
    const students = await getStudent();
    //   return file
    res.send(students);
  } catch (error) {
    next(error);
  }
});
// =
// == CREATE / POST
studentsRouter.post(
  "/",
  studentValidationMiddleware,
  async (req, res, next) => {
    const errList = validationResult(req);
    if (!errList.isEmpty()) {
      next(createHttpError(400, "Error body"));
    } else {
      try {
        const newStud = { ...req.body, id: uniqid(), createdAt: new Date() };
        console.log(newStud);
        const students = await getStudent();
        // == PUSH
        students.push(newStud);
        writeStudent(students);
        //   RESPONSE
        console.log(students);
        res.status(201).send(newStud);
      } catch (error) {
        next(createHttpError(402));
      }
    }
  }
);
// == READ / GET /:id
studentsRouter.get("/:studentID", async (req, res, next) => {
  try {
    console.log(req.params.studentID);
    const students = await getStudent();
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
studentsRouter.put("/:studentID", async (req, res, next) => {
  try {
    // Get students
    const students = await getStudent();
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
studentsRouter.delete("/:studentID", async (req, res, next) => {
  try {
    // Get students
    const students = await getStudent();
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
