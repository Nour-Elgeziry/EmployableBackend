import express from "express";
import EmployerController from "../controllers/Employer.js";
import verifyToken from "../middleware/tokenVerification.js";

const EmployerRouter = express.Router();

EmployerRouter.get("/", (req, res) => {
  res.send("Hello Employable user! This is the backend server employer route");
});

EmployerRouter.post("/register", async (req, res) => {
  const response = await EmployerController.registerEmployer(req, res);
  res.send(response);
});

EmployerRouter.post("/login", async (req, res) => {
  const response = await EmployerController.loginEmployer(req, res);
  res.send(response);
});

export default EmployerRouter;
