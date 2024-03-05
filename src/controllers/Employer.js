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
  signUpEmployer,
  signInEmployer,
};

export default EmployerController;
