import express from "express";

const employerRouter = express.Router();

employerRouter.get("/", (req, res) => {
  res.send("Hello HireMe user! This is the backend server employer route");
});

export default employerRouter;