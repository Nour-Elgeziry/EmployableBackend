import express from "express";

import JobSeekerRouter from "./JobSeeker.js";
import EmployerRouter from "./Employer.js";
import UserRouter from "./User.js";

const router = express.Router();

router.use("/jobSeeker", JobSeekerRouter);
router.use("/employer", EmployerRouter);
router.use("/user", UserRouter);

export default router;
