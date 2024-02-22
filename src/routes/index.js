import express from "express";

import UserRouter from "./User.js";
import EmployerRouter from "./Employer.js";

const router = express.Router();

router.use("/user", UserRouter);
router.use("/employer", EmployerRouter);

export default router;
