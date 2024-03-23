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
        jobSeekerShortList: employer.jobSeekerShortList,
        role: "employer",
      });
    });
  } catch (error) {
    if (error.message === "401") {
      res.status(401).send("Invalid credentials");
    } else res.status(500).send(`Error in login employer: ${error}`);
  }
};

const getJobSeekerShortList = async (req, res) => {
  try {
    const { email } = req.user;
    const jobSeekerShortList = await EmployerService.getJobSeekerShortList(email);
    res.status(200).json(jobSeekerShortList);
  } catch (error) {
    res.status(500).send(`Error in getting job seeker shortlist: ${error}`);
  }
};

const addJobSeekerToShortList = async (req, res) => {
  try {
    const { email } = req.user;
    const { jobSeekerId } = req.body;
    const updatedShortList = await EmployerService.addJobSeekerToShortList(
      email,
      jobSeekerId
    );
    res.status(200).json(updatedShortList);
  } catch (error) {
    res.status(500).send(`Error in adding job seeker to shortlist: ${error}`);
  }
};

const removeJobSeekerFromShortList = async (req, res) => {
  try {
    const { email } = req.user;
    const { jobSeekerId } = req.body;
    const updatedShortList = await EmployerService.removeJobSeekerFromShortList(
      email,
      jobSeekerId
    );
    res.status(200).json(updatedShortList);
  } catch (error) {
    res.status(500).send(`Error in removing jobSeeker from shortlist: ${error}`);
  }
};

const EmployerController = {
  signUpEmployer,
  signInEmployer,
  getJobSeekerShortList,
  addJobSeekerToShortList,
  removeJobSeekerFromShortList,
};

export default EmployerController;
