import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// =
const { readJSON, writeJSON, writeFile } = fs;
// Students
const dataFolder = join(dirname(fileURLToPath(import.meta.url)), "./students");
const studentJson = join(dataFolder, "students.json");
// Student
export const getStudent = () => readJSON(studentJson);
export const writeStudent = (content) => writeJSON(studentJson, content);

// =
const publFolderPath = join(process.cwd(), "/public/img/students");
export const saveStudPic = (name, contentBuffer) =>
  writeFile(join(publFolderPath, name), contentBuffer);
