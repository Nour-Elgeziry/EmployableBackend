import express from "express";
import EmployerController from "../controllers/Employer.js";
import verifyToken from "../middleware/tokenVerification.js";

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

EmployerRouter.get("/get-job-seeker-shortlist", verifyToken, async (req, res) => {
  await EmployerController.getJobSeekerShortList(req, res);
});

EmployerRouter.post(
  "/add-job-seeker-shortlist",
  verifyToken,
  async (req, res) => {
    await EmployerController.addJobSeekerToShortList(req, res);
  }
);

EmployerRouter.post(
  "/remove-job-seeker-shortlist",
  verifyToken,
  async (req, res) => {
    await EmployerController.removeJobSeekerFromShortList(req, res);
  }
);

export default EmployerRouter;
