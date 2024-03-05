import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Employee from "../models/Employee.js";

const getAllEmployees = async () => {
  try {
    const employees = await Employee.find({
      isPersonalInformationComplete: true,
      isCareerInformationComplete: true,
    }).select("_id name email age country title education experience seniority");
    return employees;
  } catch (error) {
    throw error;
  }
};

const signUpEmployee = async (email, password) => {
  try {
    let employee = await Employee.findOne({ email });

    if (employee) {
      throw new Error("409");
    }
    employee = new Employee({ email, password });
    await employee.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signInEmployee = async (email, password) => {
  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      throw new Error("401");
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      throw new Error("401");
    } else {
      // generate token
      const token = jwt.sign(
        { userId: employee._id, email: employee.email, role: "employee" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const returnedEmployeeObj = {
        email: employee.email,
        name: employee.name,
        age: employee.age,
        country: employee.country,
        isPersonalInformationComplete: employee.isPersonalInformationComplete,
        isCareerInformationComplete: employee.isCareerInformationComplete,
        token: token,
        role: "employee",
      };

      return returnedEmployeeObj;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const registerPersonalInformation = async (email, name, age, country) => {
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      throw new Error("404");
    }
    employee.name = name;
    employee.age = age;
    employee.country = country;
    employee.isPersonalInformationComplete = true;

    await employee.save();
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
    const employee = await Employee.findOne({ email });
    if (!employee) {
      throw new Error("404");
    }
    employee.education = education;
    employee.experience = experience;
    employee.seniority = seniority;
    employee.title = title;
    employee.cv = cv;
    employee.isCareerInformationComplete = true;

    await employee.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const EmployeeService = {
  getAllEmployees,
  signUpEmployee,
  signInEmployee,
  registerPersonalInformation,
  registerCareerInformation,
};

export default EmployeeService;
