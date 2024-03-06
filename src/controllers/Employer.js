import EmployerService from "../services/Employer.js";

const signUpEmployer = async (req, res) => {
  try {
    const { email, password, name, company, website } = req.body;
    await EmployerService.signUpEmployer(
      email,
      password,
      name,
      company,
      website
    );
    res.status(201).send("Employer registered successfully");
  } catch (error) {
    if (error.message === "409") {
      res.status(409).send("Employer already exists");
    } else res.status(500).send(`Error in saving employer: ${error}`);
  }
};

const signInEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;

    await EmployerService.signInEmployer(email, password).then((employer) => {
      // return token in a httpOnly cookie along with user details
      res.cookie("token", employer.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        email: employer.email,
        name: employer.name,
        company: employer.company,
        website: employer.website,
        employeeShortList: employer.employeeShortList,
        role: "employer",
      });
    });
  } catch (error) {
    if (error.message === "401") {
      res.status(401).send("Invalid credentials");
    } else res.status(500).send(`Error in login employer: ${error}`);
  }
};

const getEmployeeShortList = async (req, res) => {
  try {
    const { email } = req.user;
    const employeeShortList = await EmployerService.getEmployeeShortList(email);
    res.status(200).json(employeeShortList);
  } catch (error) {
    res.status(500).send(`Error in getting employee shortlist: ${error}`);
  }
};

const addEmployeeToShortList = async (req, res) => {
  try {
    const { email } = req.user;
    const { employeeId } = req.body;
    const updatedShortList = await EmployerService.addEmployeeToShortList(
      email,
      employeeId
    );
    res.status(200).json(updatedShortList);
  } catch (error) {
    res.status(500).send(`Error in adding employee to shortlist: ${error}`);
  }
};

const removeEmployeeFromShortList = async (req, res) => {
  try {
    const { email } = req.user;
    const { employeeId } = req.body;
    const updatedShortList = await EmployerService.removeEmployeeFromShortList(
      email,
      employeeId
    );
    res.status(200).json(updatedShortList);
  } catch (error) {
    res.status(500).send(`Error in removing employee from shortlist: ${error}`);
  }
};

const EmployerController = {
  signUpEmployer,
  signInEmployer,
  getEmployeeShortList,
  addEmployeeToShortList,
  removeEmployeeFromShortList,
};

export default EmployerController;
