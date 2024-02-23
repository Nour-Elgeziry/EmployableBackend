import express from "express";

import EmployeeRouter from "./Employee.js";
import EmployerRouter from "./Employer.js";
import UserRouter from "./User.js";

const router = express.Router();

router.use("/employee", EmployeeRouter);
router.use("/employer", EmployerRouter);
router.use("/user", UserRouter);

export default router;
