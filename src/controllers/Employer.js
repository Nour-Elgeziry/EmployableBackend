import EmployerService from "../services/Employer.js";

const registerEmployer = async (req, res) => {
  try {
    const { email, password, name, company, website } = req.body;
    await EmployerService.registerEmployer(
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

const loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;

    await EmployerService.loginEmployer(email, password).then((employer) => {
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
        date: employer.date,
        token: employer.token,
        role: "employer",
      });
    });
  } catch (error) {
    if (error.message === "401") {
      res.status(401).send("Invalid credentials");
    } else res.status(500).send(`Error in login employer: ${error}`);
  }
};

const EmployerController = {
  registerEmployer,
  loginEmployer,
};

export default EmployerController;
