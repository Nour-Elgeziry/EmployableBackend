import express from "express";
import multer from "multer";
import JobSeekerController from "../controllers/JobSeeker.js";
import verifyToken from "../middleware/tokenVerification.js";

const upload = multer();

const JobSeekerRouter = express.Router();

JobSeekerRouter.get("/", (req, res) => {
  res.send("Hello Employable user! This is the backend server user route");
});

JobSeekerRouter.get("/get-all", async (req, res) => {
  await JobSeekerController.getAllJobSeekers(req, res);
});

JobSeekerRouter.post("/signUp", async (req, res) => {
  await JobSeekerController.signUpJobSeeker(req, res);
});

JobSeekerRouter.post("/signIn", async (req, res) => {
  await JobSeekerController.signInJobSeeker(req, res);
});

JobSeekerRouter.post("/personal-info", verifyToken, async (req, res) => {
  await JobSeekerController.registerPersonalInformation(req, res);
});

JobSeekerRouter.post(
  "/career-info",
  verifyToken,
  upload.single("cv"),
  async (req, res) => {
    await JobSeekerController.registerCareerInformation(req, res);
  }
);

export default JobSeekerRouter;
