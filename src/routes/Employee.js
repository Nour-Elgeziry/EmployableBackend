import express from "express";
import multer from "multer";
import EmployeeController from "../controllers/Employee.js";
import verifyToken from "../middleware/tokenVerification.js";

const upload = multer();

const EmployeeRouter = express.Router();

EmployeeRouter.get("/", (req, res) => {
  res.send("Hello Employable user! This is the backend server user route");
});

EmployeeRouter.get("/get-all", async (req, res) => {
  await EmployeeController.getAllEmployees(req, res);
});

EmployeeRouter.post("/register", async (req, res) => {
  await EmployeeController.registerEmployee(req, res);
});

EmployeeRouter.post("/login", async (req, res) => {
  await EmployeeController.loginEmployee(req, res);
});

EmployeeRouter.post("/personal-info", verifyToken, async (req, res) => {
  await EmployeeController.registerPersonalInformation(req, res);
});

EmployeeRouter.post(
  "/career-info",
  verifyToken,
  upload.single("cv"),
  async (req, res) => {
    await EmployeeController.registerCareerInformation(req, res);
  }
);

export default EmployeeRouter;
