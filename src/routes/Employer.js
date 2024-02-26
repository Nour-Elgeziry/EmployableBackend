import express from "express";
import EmployerController from "../controllers/Employer.js";

const EmployerRouter = express.Router();

EmployerRouter.get("/", (req, res) => {
  res.send("Hello Employable user! This is the backend server employer route");
});

EmployerRouter.post("/register", async (req, res) => {
  await EmployerController.registerEmployer(req, res);
});

EmployerRouter.post("/login", async (req, res) => {
  await EmployerController.loginEmployer(req, res);
});

export default EmployerRouter;
