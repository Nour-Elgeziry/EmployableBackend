import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Employer from "../models/Employer.js";

const signUpEmployer = async (email, password, name, company, website) => {
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

const signInEmployer = async (email, password) => {
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
        jobSeekerShortList: employer.jobSeekerShortList,
        role: "employer",
      };

      return returnedEmployerObj;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getJobSeekerShortList = async (email) => {
  try {
    const jobSeekerShortList = await Employer.findOne({ email }).populate(
      "jobSeekerShortList"
    );
    return jobSeekerShortList;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addJobSeekerToShortList = async (email, jobSeekerId) => {
  try {
    const employer = await Employer.findOne({ email });
    employer.jobSeekerShortList.push(jobSeekerId);
    await employer.save();
    const updatedEmployer = await Employer.findOne({ email }).populate(
      "jobSeekerShortList"
    );
    return updatedEmployer.jobSeekerShortList;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeJobSeekerFromShortList = async (email, jobSeekerId) => {
  try {
    const employer = await Employer.findOne({ email });
    employer.jobSeekerShortList = employer.jobSeekerShortList.filter(
      (id) => id.toString() !== jobSeekerId
    );
    await employer.save();
    const updatedEmployer = await Employer.findOne({ email }).populate(
      "jobSeekerShortList"
    );
    return updatedEmployer.jobSeekerShortList;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const EmployerService = {
  signUpEmployer,
  signInEmployer,
  getJobSeekerShortList,
  addJobSeekerToShortList,
  removeJobSeekerFromShortList,
};
export default EmployerService;
