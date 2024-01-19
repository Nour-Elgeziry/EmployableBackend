import express from "express";
import userController from "../controllers/User.js";
import tokenVerification from "../middleware/tokenVerification.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Hello HireMe user! This is the backend server user route");
});

userRouter.post("/register", async (req, res) => {
  const response = await userController.registerUser(req, res);
  res.send(response);
});

userRouter.post("/login", async (req, res) => {
  const response = await userController.loginUser(req, res);
  res.send(response);
});

userRouter.post("/personal-info", tokenVerification ,async (req, res) => {
  const response = await userController.registerPersonalInformation(req, res);
  res.send(response);
});

export default userRouter;
