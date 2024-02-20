import express from "express";
import multer from "multer";
import userController from "../controllers/User.js";
import tokenVerification from "../middleware/tokenVerification.js";

const upload = multer();

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Hello Employable user! This is the backend server user route");
});

userRouter.post("/register", async (req, res) => {
  const response = await userController.registerUser(req, res);
  res.send(response);
});

userRouter.post("/login", async (req, res) => {
  const response = await userController.loginUser(req, res);
  res.send(response);
});

userRouter.get("/logout", async (req, res) => {
  const response = await userController.logoutUser(req, res);
  res.send(response);
});

userRouter.get("/check-user-logged-in", async (req, res) => {
  const response = await userController.checkUserLoggedIn(req, res);
  res.send(response);
});

userRouter.post("/personal-info", tokenVerification, async (req, res) => {
  const response = await userController.registerPersonalInformation(req, res);
  res.send(response);
});

userRouter.post(
  "/career-info",
  tokenVerification,
  upload.single("cv"),
  async (req, res) => {
    const response = await userController.registerCareerInformation(req, res);
    res.send(response);
  }
);

export default userRouter;
