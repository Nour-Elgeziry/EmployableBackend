import express from "express";

import EmployeeRouter from "./Employee.js";
import EmployerRouter from "./Employer.js";

const router = express.Router();

router.use("/employee", EmployeeRouter);
router.use("/employer", EmployerRouter);

export default router;
