import express from "express";

import userRouter from "./User.js";
import employerRouter from "./Employer.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/employer", employerRouter);

export default router;
