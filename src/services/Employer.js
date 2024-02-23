import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Employer from "../models/Employer.js";

const registerEmployer = async (email, password, name, company, website) => {
  try {
    let employer = await Employer.findOne({ email });
    if (employer) {
      throw new Error("409");
    }
    employer = new Employer({
      email,
      password,
      name,
      company,
      website,
    });
    await employer.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginEmployer = async (email, password) => {
  try {
    const employer = await Employer.findOne({ email });
    if (!employer) {
      throw new Error("401");
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(password, employer.password);
    if (!isPasswordValid) {
      throw new Error("401");
    } else {
      // generate token
      const token = jwt.sign(
        { userId: employer._id, email: employer.email, role: "employer" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const returnedEmployerObj = {
        email: employer.email,
        company: employer.company,
        website: employer.website,
        date: employer.date,
        token: token,
        role: "employer",
      };

      return returnedEmployerObj;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const EmployerService = {
  registerEmployer,
  loginEmployer,
};
export default EmployerService;
