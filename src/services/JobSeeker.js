import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import JobSeeker from "../models/JobSeeker.js";

const getAllJobSeekers = async () => {
  try {
    const jobSeekers = await JobSeeker.find({
      isPersonalInformationComplete: true,
      isCareerInformationComplete: true,
    }).select(
      "_id name email age country title education experience seniority"
    );
    return jobSeekers;
  } catch (error) {
    throw error;
  }
};

const signUpJobSeeker = async (email, password) => {
  try {
    let jobSeeker = await JobSeeker.findOne({ email });

    if (jobSeeker) {
      throw new Error("409");
    }
    jobSeeker = new JobSeeker({ email, password });
    await jobSeeker.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signInJobSeeker = async (email, password) => {
  try {
    const jobSeeker = await JobSeeker.findOne({ email });

    if (!jobSeeker) {
      throw new Error("401");
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(password, jobSeeker.password);
    if (!isPasswordValid) {
      throw new Error("401");
    } else {
      // generate token
      const token = jwt.sign(
        { userId: jobSeeker._id, email: jobSeeker.email, role: "jobSeeker" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const returnedJobSeekerObj = {
        email: jobSeeker.email,
        name: jobSeeker.name,
        age: jobSeeker.age,
        country: jobSeeker.country,
        isPersonalInformationComplete: jobSeeker.isPersonalInformationComplete,
        isCareerInformationComplete: jobSeeker.isCareerInformationComplete,
        token: token,
        role: "jobSeeker",
      };

      return returnedJobSeekerObj;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const registerPersonalInformation = async (email, name, age, country) => {
  try {
    const jobSeeker = await JobSeeker.findOne({ email });
    if (!jobSeeker) {
      throw new Error("404");
    }
    jobSeeker.name = name;
    jobSeeker.age = age;
    jobSeeker.country = country;
    jobSeeker.isPersonalInformationComplete = true;

    await jobSeeker.save();
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
  title,
  cv
) => {
  try {
    const jobSeeker = await JobSeeker.findOne({ email });
    if (!jobSeeker) {
      throw new Error("404");
    }
    jobSeeker.education = education;
    jobSeeker.experience = experience;
    jobSeeker.seniority = seniority;
    jobSeeker.title = title;
    jobSeeker.cv = cv;
    jobSeeker.isCareerInformationComplete = true;

    await jobSeeker.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const JobSeekerService = {
  getAllJobSeekers,
  signUpJobSeeker,
  signInJobSeeker,
  registerPersonalInformation,
  registerCareerInformation,
};

export default JobSeekerService;
