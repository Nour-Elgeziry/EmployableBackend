import bcrypt from "bcryptjs";

import User from "../models/User.js";

const registerUser = async (email, password) => {
  try {
    let user = await User.findOne({ email });

    if (user) {
      throw new Error("409");
    }
    user = new User({ email, password });
    await user.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("401");
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("401");
    } else {
      return user;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const userService = {
  registerUser,
  loginUser,
};

export default userService;
