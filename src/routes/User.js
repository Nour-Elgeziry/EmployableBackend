import express from "express";
import multer from "multer";
import UserController from "../controllers/User.js";
import tokenVerification from "../middleware/tokenVerification.js";

const upload = multer();

const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("Hello Employable user! This is the backend server user route");
});

UserRouter.post("/register", async (req, res) => {
  const response = await UserController.registerUser(req, res);
  res.send(response);
});

UserRouter.post("/login", async (req, res) => {
  const response = await UserController.loginUser(req, res);
  res.send(response);
});

UserRouter.get("/logout", async (req, res) => {
  const response = await UserController.logoutUser(req, res);
  res.send(response);
});

UserRouter.get("/check-user-logged-in", async (req, res) => {
  const response = await UserController.checkUserLoggedIn(req, res);
  res.send(response);
});

UserRouter.post("/personal-info", tokenVerification, async (req, res) => {
  const response = await UserController.registerPersonalInformation(req, res);
  res.send(response);
});

UserRouter.post(
  "/career-info",
  tokenVerification,
  upload.single("cv"),
  async (req, res) => {
    const response = await UserController.registerCareerInformation(req, res);
    res.send(response);
  }
);

export default UserRouter;
