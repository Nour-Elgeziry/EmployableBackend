import EmployeeService from "../services/Employee.js";

const getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(`Error in getting employees: ${error}`);
  }
};

const registerEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    await EmployeeService.registerEmployee(email, password);
    res.status(201).send("Employee registered successfully");
  } catch (error) {
    if (error.message === "409") {
      res.status(409).send("Employee already exists");
    } else res.status(500).send(`Error in saving employee: ${error}`);
  }
};

const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    await EmployeeService.loginEmployee(email, password).then((employee) => {
      // return token in a httpOnly cookie along with user details
      res.cookie("token", employee.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        email: employee.email,
        name: employee.name,
        age: employee.age,
        country: employee.country,
        isPersonalInformationComplete: employee.isPersonalInformationComplete,
        isCareerInformationComplete: employee.isCareerInformationComplete,
        role: "employee",
      });
    });
  } catch (error) {
    if (error.message === "401") {
      res.status(401).send("Invalid credentials");
    } else res.status(500).send(`Error in login employee: ${error}`);
  }
};

const registerPersonalInformation = async (req, res) => {
  try {
    const { email } = req.user;
    const { name, age, country } = req.body;
    if (!name || !age || !country) {
      return res.status(400).send("All fields are required");
    }
    await EmployeeService.registerPersonalInformation(
      email,
      name,
      age,
      country
    );
    res.status(201).send("Personal information saved successfully");
  } catch (error) {
    if (error.message === "404") {
      res.status(404).send("Employee not found");
    } else
      res
        .status(500)
        .send(`Error in saving employee personal information: ${error}`);
  }
};

const registerCareerInformation = async (req, res) => {
  try {
    const { email } = req.user;
    const { education, experience, seniority, title } = req.body;
    const cv = req.file.buffer;
    if (!education || !experience || !seniority || !title || !cv) {
      return res.status(400).send("All fields are required");
    }

    await EmployeeService.registerCareerInformation(
      email,
      education,
      experience,
      seniority,
      title,
      cv
    );
    res.status(201).send("Career information saved successfully");
  } catch (error) {
    if (error.message === "404") {
      res.status(404).send("Employee not found");
    } else
      res.status(500).send(`Error in saving user career information: ${error}`);
  }
};

const EmployeeController = {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
  registerPersonalInformation,
  registerCareerInformation,
};

export default EmployeeController;
