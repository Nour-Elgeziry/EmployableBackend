import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      // generate token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const returnedUserObj = {
        email: user.email,
        name: user.name,
        age: user.age,
        country: user.country,
        token: token,
        role: "user",
      };

      return returnedUserObj;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkUserLoggedIn = async (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const registerPersonalInformation = async (email, name, age, country) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("404");
    }
    user.name = name;
    user.age = age;
    user.country = country;

    await user.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const registerCareerInformation = async (
  email,
  education,
  experience,
  seniority,
  profession,
  cv
) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("404");
    }
    user.education = education;
    user.experience = experience;
    user.seniority = seniority;
    user.profession = profession;
    user.cv = cv;

    await user.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const userService = {
  registerUser,
  loginUser,
  registerPersonalInformation,
  registerCareerInformation,
  checkUserLoggedIn,
};

export default userService;
