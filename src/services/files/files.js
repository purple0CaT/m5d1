import express from "express";
import createHttpError from "http-errors";
import multer from "multer";
import { saveStudPic } from "../fs-tools.js";

const filesRouter = express.Router();
filesRouter.post(
  "/uploadSingle",
  multer({
    fileFilter: (req, file, cb) => {
      if (file.mimetype != "image/jpeg")
        cb(createHttpError(400, "Format not suported!"), false);
      else cb(null, true);
    },
  }).single("profilePic"),
  async (req, res, next) => {
    try {
      await saveStudPic(req.file.originalname, req.file.buffer);
      res.status(200).send("Ok");
    } catch (err) {
      next(err);
    }
  }
);
filesRouter.post(
  "/uploadMultiple",
  multer().array("profilePic"),
  async (req, res, next) => {
    try {
      console.log(req.files);
      const arrayPromiss = req.files.map((file) =>
        saveStudPic(file.originalname, file.buffer)
      );
      await Promise.all(arrayPromiss);
      res.send("Ok");
    } catch (err) {
      next(err);
    }
  }
);
export default filesRouter;
