import express from "express";
import EmployerController from "../controllers/Employer.js";

const EmployerRouter = express.Router();

EmployerRouter.get("/", (req, res) => {
  res.send("Hello Employable user! This is the backend server employer route");
});

EmployerRouter.post("/signUp", async (req, res) => {
  await EmployerController.signUpEmployer(req, res);
});

EmployerRouter.post("/signIn", async (req, res) => {
  await EmployerController.signInEmployer(req, res);
});

export default EmployerRouter;
