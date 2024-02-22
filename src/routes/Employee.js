import express from "express";
import multer from "multer";
import EmployeeController from "../controllers/Employee.js";
import tokenVerification from "../middleware/tokenVerification.js";

const upload = multer();

const EmployeeRouter = express.Router();

EmployeeRouter.get("/", (req, res) => {
  res.send("Hello Employable user! This is the backend server user route");
});

EmployeeRouter.post("/register", async (req, res) => {
  const response = await EmployeeController.registerEmployee(req, res);
  res.send(response);
});

EmployeeRouter.post("/login", async (req, res) => {
  const response = await EmployeeController.loginEmployee(req, res);
  res.send(response);
});

EmployeeRouter.get("/logout", async (req, res) => {
  const response = await EmployeeController.logoutEmployee(req, res);
  res.send(response);
});

EmployeeRouter.get("/check-user-logged-in", async (req, res) => {
  const response = await EmployeeController.checkEmployeeLoggedIn(req, res);
  res.send(response);
});

EmployeeRouter.post("/personal-info", tokenVerification, async (req, res) => {
  const response = await EmployeeController.registerPersonalInformation(
    req,
    res
  );
  res.send(response);
});

EmployeeRouter.post(
  "/career-info",
  tokenVerification,
  upload.single("cv"),
  async (req, res) => {
    const response = await EmployeeController.registerCareerInformation(
      req,
      res
    );
    res.send(response);
  }
);

export default EmployeeRouter;
