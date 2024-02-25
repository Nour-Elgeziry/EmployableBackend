import express from "express";

import UserController from "../controllers/User.js";
import verifyToken from "../middleware/tokenVerification.js";

const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("Hello User! This is the backend server user route");
});

UserRouter.get("/logout", async (req, res) => {
  UserController.logoutUser(req, res);
});

UserRouter.get("/check-user-logged-in", verifyToken, async (req, res) => {
  const { role } = req.user;
  return res.status(200).json({ role });
});

export default UserRouter;
